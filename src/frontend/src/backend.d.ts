import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Host {
    id: bigint;
    bio: string;
    verified: boolean;
    destinationId: bigint;
    name: string;
    trustIndex: number;
    location: string;
}
export interface Destination {
    id: bigint;
    region: Region;
    galleryImages: Array<ExternalBlob>;
    trustBreakdown: TrustBreakdown;
    name: string;
    tags: Array<string>;
    trustScore: number;
    highlights: Array<string>;
    heroImage?: ExternalBlob;
    story: string;
    isVerified: boolean;
    category: Category;
    trustedHosts: Array<bigint>;
}
export interface DestinationWithMedia {
    destination: Destination;
    gallery: Array<ExternalBlob>;
}
export interface Coordinates {
    latitude: number;
    longitude: number;
}
export interface FeaturedPlacesResponse {
    heroImages: Array<ExternalBlob>;
    topDestinations: Array<DestinationWithMedia>;
}
export interface Region {
    country: string;
    cityOrVillage?: string;
    state?: string;
    coordinates?: Coordinates;
}
export interface ExperienceRequestInput {
    destinationId: bigint;
    message: string;
}
export interface ExperienceRequest {
    id: bigint;
    destinationId: bigint;
    userPrincipal: Principal;
    message: string;
}
export interface StoryResponse {
    destinationId: bigint;
    story?: ExternalBlob;
    gallery: Array<ExternalBlob>;
}
export interface UserProfileView {
    pastExplorations: Array<bigint>;
    principal: Principal;
    displayName: string;
    role: UserRole;
    savedFavorites: Array<bigint>;
}
export interface Media {
    id: bigint;
    url: ExternalBlob;
    destinationId: bigint;
    name: string;
    mediaType: MediaType;
}
export interface TrustBreakdown {
    communityReviews: number;
    hostVerification: number;
    safetyRatings: number;
}
export enum Category {
    villageStays = "villageStays",
    culturalImmersion = "culturalImmersion",
    foodTrails = "foodTrails",
    natureEco = "natureEco"
}
export enum MediaType {
    story = "story",
    gallery = "gallery"
}
export enum UserRole {
    host = "host",
    traveller = "traveller"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDestination(destInput: Destination): Promise<void>;
    addHost(hostInput: Host): Promise<void>;
    addMediaEntry(inputMedia: Media): Promise<void>;
    addPastExploration(destinationId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    createUserProfile(role: UserRole, displayName: string): Promise<void>;
    fetchDestinationStory(destinationId: bigint): Promise<StoryResponse | null>;
    fetchFeaturedPlaces(): Promise<FeaturedPlacesResponse>;
    filterTrustworthyDestinations(category: Category, minTrustScore: number): Promise<Array<Destination>>;
    getAllRequests(): Promise<Array<ExperienceRequest>>;
    getCallerUserProfile(): Promise<UserProfileView | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getDestination(id: bigint): Promise<Destination | null>;
    getHost(id: bigint): Promise<Host | null>;
    getUserProfileView(user: Principal): Promise<UserProfileView | null>;
    getUserRequests(): Promise<Array<ExperienceRequest>>;
    isCallerAdmin(): Promise<boolean>;
    listDestinations(): Promise<Array<Destination>>;
    listHosts(): Promise<Array<Host>>;
    saveCallerUserProfile(profile: UserProfileView): Promise<void>;
    saveFavorite(destinationId: bigint): Promise<void>;
    searchPlaces(searchTerm: string, category: Category | null): Promise<Array<Destination>>;
    submitExperienceRequest(request: ExperienceRequestInput): Promise<void>;
}
