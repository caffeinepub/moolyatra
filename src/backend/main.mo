import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

import MixinStorage "blob-storage/Mixin";

// Enable stable data migration.

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Media = {
    id : Nat;
    url : Storage.ExternalBlob;
    name : Text;
    destinationId : Nat;
    mediaType : MediaType;
  };

  public type MediaType = {
    #story;
    #gallery;
  };

  public type Category = {
    #culturalImmersion;
    #natureEco;
    #foodTrails;
    #villageStays;
  };

  public type TrustBreakdown = {
    communityReviews : Float; // 1-5 scale
    safetyRatings : Float; // 1-5 scale
    hostVerification : Float; // 1-5 scale
  };

  public type Destination = {
    id : Nat;
    name : Text;
    region : Region;
    trustScore : Float;
    category : Category;
    story : Text;
    tags : [Text];
    trustBreakdown : TrustBreakdown;
    heroImage : ?Storage.ExternalBlob;
    galleryImages : [Storage.ExternalBlob];
    isVerified : Bool;
    highlights : [Text];
    trustedHosts : [Nat];
  };

  public type Region = {
    country : Text;
    state : ?Text;
    cityOrVillage : ?Text;
    coordinates : ?Coordinates;
  };

  public type Coordinates = {
    latitude : Float;
    longitude : Float;
  };

  public type Host = {
    id : Nat;
    name : Text;
    location : Text;
    verified : Bool;
    trustIndex : Float; // 1-5
    bio : Text;
    destinationId : Nat;
  };

  public type UserRole = {
    #traveller;
    #host;
  };

  public type UserProfile = {
    principal : Principal;
    role : UserRole;
    displayName : Text;
    savedFavorites : List.List<Nat>;
    pastExplorations : List.List<Nat>;
  };

  public type UserProfileView = {
    principal : Principal;
    role : UserRole;
    displayName : Text;
    savedFavorites : [Nat];
    pastExplorations : [Nat];
  };

  public type ExperienceRequest = {
    id : Nat;
    userPrincipal : Principal;
    destinationId : Nat;
    message : Text;
  };

  public type ExperienceRequestInput = {
    destinationId : Nat;
    message : Text;
  };

  public type StoryResponse = {
    story : ?Storage.ExternalBlob;
    gallery : [Storage.ExternalBlob];
    destinationId : Nat;
  };

  public type DestinationWithMedia = {
    destination : Destination;
    gallery : [Storage.ExternalBlob];
  };

  public type FeaturedPlacesResponse = {
    heroImages : [Storage.ExternalBlob];
    topDestinations : [DestinationWithMedia];
  };

  // Storage - extended to include media
  let userProfiles = Map.empty<Principal, UserProfile>();
  let destinations = Map.empty<Nat, Destination>();
  let hosts = Map.empty<Nat, Host>();
  let experienceRequests = Map.empty<Nat, ExperienceRequest>();
  let mediaStore = Map.empty<Nat, Media>();

  var nextDestinationId = 1;
  var nextHostId = 1;
  var nextRequestId = 1;
  var nextMediaId = 1;

  // Helper methods
  func getUserProfile(user : Principal) : ?UserProfile {
    userProfiles.get(user);
  };

  func addUserProfile(user : Principal, profile : UserProfile) {
    userProfiles.add(user, profile);
  };

  func updateUserProfile(user : Principal, f : UserProfile -> UserProfile) {
    switch (userProfiles.get(user)) {
      case (null) { Runtime.trap("User not found") };
      case (?profile) { userProfiles.add(user, f(profile)) };
    };
  };

  // User Profiles

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfileView {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users have profiles");
    };
    switch (getUserProfile(caller)) {
      case (null) { null };
      case (?profile) {
        ?{
          principal = profile.principal;
          role = profile.role;
          displayName = profile.displayName;
          savedFavorites = profile.savedFavorites.toArray();
          pastExplorations = profile.pastExplorations.toArray();
        };
      };
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfileView) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    let sanitizedProfile : UserProfile = {
      principal = caller;
      role = profile.role;
      displayName = profile.displayName;
      savedFavorites = List.fromArray<Nat>(profile.savedFavorites);
      pastExplorations = List.fromArray<Nat>(profile.pastExplorations);
    };
    addUserProfile(caller, sanitizedProfile);
  };

  public query ({ caller }) func getUserProfileView(user : Principal) : async ?UserProfileView {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (getUserProfile(user)) {
      case (null) { null };
      case (?profile) {
        ?{
          principal = profile.principal;
          role = profile.role;
          displayName = profile.displayName;
          savedFavorites = profile.savedFavorites.toArray();
          pastExplorations = profile.pastExplorations.toArray();
        };
      };
    };
  };

  public shared ({ caller }) func createUserProfile(role : UserRole, displayName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create a profile");
    };
    switch (getUserProfile(caller)) {
      case (?_) { Runtime.trap("User profile already exists") };
      case (null) {};
    };
    let profile : UserProfile = {
      principal = caller;
      role;
      displayName;
      savedFavorites = List.empty<Nat>();
      pastExplorations = List.empty<Nat>();
    };
    addUserProfile(caller, profile);
  };

  func addFavoriteInternal(caller : Principal, destinationId : Nat) {
    updateUserProfile(
      caller,
      func(profile : UserProfile) : UserProfile {
        profile.savedFavorites.add(destinationId);
        profile;
      },
    );
  };

  public shared ({ caller }) func saveFavorite(destinationId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save favorites");
    };
    addFavoriteInternal(caller, destinationId);
  };

  func addPastExplorationInternal(caller : Principal, destinationId : Nat) {
    updateUserProfile(
      caller,
      func(profile : UserProfile) : UserProfile {
        profile.pastExplorations.add(destinationId);
        profile;
      },
    );
  };

  public shared ({ caller }) func addPastExploration(destinationId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add past explorations");
    };
    addPastExplorationInternal(caller, destinationId);
  };

  // Destinations

  public query ({ caller }) func listDestinations() : async [Destination] {
    destinations.values().toArray();
  };

  public query ({ caller }) func getDestination(id : Nat) : async ?Destination {
    destinations.get(id);
  };

  public shared ({ caller }) func addDestination(destInput : Destination) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add destinations");
    };
    let newDest : Destination = {
      destInput with id = nextDestinationId;
    };
    destinations.add(nextDestinationId, newDest);
    nextDestinationId += 1;
  };

  // Hosts

  public query ({ caller }) func listHosts() : async [Host] {
    hosts.values().toArray();
  };

  public query ({ caller }) func getHost(id : Nat) : async ?Host {
    hosts.get(id);
  };

  public shared ({ caller }) func addHost(hostInput : Host) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add hosts");
    };
    let newHost : Host = {
      hostInput with id = nextHostId;
    };
    hosts.add(nextHostId, newHost);
    nextHostId += 1;
  };

  // Experience Requests

  public shared ({ caller }) func submitExperienceRequest(request : ExperienceRequestInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit requests");
    };

    let newRequest : ExperienceRequest = {
      id = nextRequestId;
      userPrincipal = caller;
      destinationId = request.destinationId;
      message = request.message;
    };

    experienceRequests.add(nextRequestId, newRequest);
    nextRequestId += 1;
  };

  public query ({ caller }) func getUserRequests() : async [ExperienceRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view requests");
    };

    experienceRequests.values().toArray().filter(
      func(req) {
        req.userPrincipal == caller;
      }
    );
  };

  public query ({ caller }) func getAllRequests() : async [ExperienceRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all requests");
    };
    experienceRequests.values().toArray();
  };

  // Fetch story for a single destination
  public query ({ caller }) func fetchDestinationStory(destinationId : Nat) : async ?StoryResponse {
    let relatedMedia = mediaStore.values().toArray().filter(
      func(media) {
        media.destinationId == destinationId;
      }
    );

    let storyBlobs = relatedMedia.filter(
      func(media) {
        media.mediaType == #story;
      }
    );

    let storyBlob = switch (storyBlobs.size()) {
      case (0) { null };
      case (_) { ?storyBlobs[0] };
    };

    if (storyBlob == null) { return null };

    let galleryBlobs = relatedMedia.filter(
      func(media) {
        media.mediaType == #gallery;
      }
    ).map(
      func(media) { media.url }
    );

    ?{
      story = switch (storyBlob) {
        case (null) { null };
        case (?media) { ?media.url; };
      };
      gallery = galleryBlobs;
      destinationId;
    };
  };

  // Fetch highlighted destinations and stories
  public query ({ caller }) func fetchFeaturedPlaces() : async FeaturedPlacesResponse {
    let featuredDests = destinations.values().toArray().filter(
      func(dest) { dest.isVerified }
    );

    let destsWithMedia = featuredDests.map(
      func(dest) {
        let relatedMedia = mediaStore.values().toArray().filter(
          func(media) { media.destinationId == dest.id }
        );

        let galleryBlobs = relatedMedia.filter(
          func(media) { media.mediaType == #gallery }
        ).map(
          func(media) { media.url }
        );

        {
          destination = dest;
          gallery = galleryBlobs;
        };
      }
    );

    let heroBlobs = featuredDests.filter(
      func(dest) { dest.heroImage != null }
    ).map(
      func(dest) { dest.heroImage }
    ).filter(
      func(blob) { blob != null }
    ).map(
      func(blob) {
        switch (blob) {
          case (null) { Runtime.trap("Unexpected null value") };
          case (?blobValue) { blobValue };
        };
      }
    );

    {
      heroImages = heroBlobs;
      topDestinations = destsWithMedia;
    };
  };

  // Filter destinations based on trustworthiness
  public query ({ caller }) func filterTrustworthyDestinations(category : Category, minTrustScore : Float) : async [Destination] {
    let allDests = destinations.values().toArray();
    let filtered = allDests.filter(
      func(dest) {
        dest.category == category and dest.trustScore >= minTrustScore and dest.isVerified;
      }
    );
    filtered;
  };

  public query ({ caller }) func searchPlaces(searchTerm : Text, category : ?Category) : async [Destination] {
    let allDests = destinations.values().toArray();
    let filtered = allDests.filter(
      func(dest) {
        isMatch(dest, searchTerm) and categoryMatch(dest, category);
      }
    );
    filtered;
  };

  func isMatch(dest : Destination, term : Text) : Bool {
    let searchTerm = term.toLower();
    dest.name.contains(#text searchTerm) or
    dest.region.country.contains(#text searchTerm) or
    dest.story.contains(#text searchTerm) or
    tagsMatch(dest, searchTerm);
  };

  func tagsMatch(dest : Destination, searchTerm : Text) : Bool {
    let tags = dest.tags;
    for (tag in tags.values()) {
      if (tag.contains(#text searchTerm)) {
        return true;
      };
    };
    false;
  };

  func categoryMatch(dest : Destination, category : ?Category) : Bool {
    switch (category) {
      case (null) { true };
      case (?cat) { dest.category == cat };
    };
  };

  // Add a new media entry (story or gallery photo)
  public shared ({ caller }) func addMediaEntry(inputMedia : Media) : async () {
    mediaStore.add(nextMediaId, { inputMedia with id = nextMediaId });
    nextMediaId += 1;
  };
};

