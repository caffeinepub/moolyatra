import { useNavigate } from '@tanstack/react-router';
import { LogOut, Heart, MapPin, Star, User, Shield, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import BottomNavigation from '../components/BottomNavigation';
import DestinationCard from '../components/DestinationCard';
import { DESTINATIONS } from '../data/destinations';
import { UserRole } from '../backend';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  // Map backend savedFavorites (bigint indices) → local DESTINATIONS
  const savedFavoriteDestinations = userProfile
    ? userProfile.savedFavorites
        .map((idx) => DESTINATIONS[Number(idx)])
        .filter(Boolean)
    : [];

  // Map backend pastExplorations
  const exploredDestinations = userProfile
    ? userProfile.pastExplorations
        .map((idx) => DESTINATIONS[Number(idx)])
        .filter(Boolean)
    : [];

  const roleLabel = userProfile?.role === UserRole.host ? 'Community Host' : 'Traveller';
  const principalShort = identity?.getPrincipal().toString().slice(0, 16) + '...';

  return (
    <div className="min-h-screen pb-20" style={{ background: 'linear-gradient(to bottom, #fdfcf8, #faf7ef)' }}>
      {/* Header */}
      <div
        className="px-4 pt-12 pb-8"
        style={{ background: 'linear-gradient(135deg, #2d5f2d 0%, #0d9488 100%)' }}
      >
        <div className="flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-3 border-4 border-white/30"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            <User className="w-10 h-10 text-white" />
          </div>
          {isAuthenticated ? (
            <>
              <h1 className="text-white font-display text-xl font-bold">
                {userProfile?.displayName ?? principalShort}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold animate-shimmer"
                  style={{ background: 'linear-gradient(135deg, #e8612c, #f5a623)', color: '#fff' }}
                >
                  ✨ Verified {roleLabel}
                </span>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-white font-display text-xl font-bold">Welcome, Explorer</h1>
              <p className="text-white/70 text-sm mt-1">Sign in to unlock your journey</p>
            </>
          )}
        </div>
      </div>

      <div className="px-4 py-5 space-y-6">
        {!isAuthenticated ? (
          /* Login CTA */
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: '#fff', boxShadow: '0 4px 20px rgba(58,42,16,0.10)' }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, #e0ede0, #d5f3f3)' }}
            >
              <Shield className="w-8 h-8" style={{ color: '#0d9488' }} />
            </div>
            <h2 className="font-display text-lg font-bold mb-2" style={{ color: '#3a2a10' }}>
              Join MoolYatra
            </h2>
            <p className="text-sm mb-5" style={{ color: '#7a5e3a' }}>
              Save favourites, track your explorations, and connect with verified hosts.
            </p>
            <button
              type="button"
              onClick={login}
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-2xl font-display font-bold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #e8612c, #f5a623)' }}
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              {isLoggingIn ? 'Signing in...' : '🌿 Sign In'}
            </button>
          </div>
        ) : profileLoading ? (
          /* Loading state */
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#0d9488' }} />
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-2xl p-4 text-center"
                style={{ background: 'linear-gradient(135deg, #e0ede0, #d5f3f3)' }}
              >
                <div className="font-display text-3xl font-bold" style={{ color: '#2d5f2d' }}>
                  {savedFavoriteDestinations.length}
                </div>
                <div className="text-xs mt-1" style={{ color: '#7a5e3a' }}>
                  Saved Favourites
                </div>
              </div>
              <div
                className="rounded-2xl p-4 text-center"
                style={{ background: 'linear-gradient(135deg, #faefd0, #fde5d0)' }}
              >
                <div className="font-display text-3xl font-bold" style={{ color: '#e8612c' }}>
                  {exploredDestinations.length}
                </div>
                <div className="text-xs mt-1" style={{ color: '#7a5e3a' }}>
                  Explored
                </div>
              </div>
            </div>

            {/* Trust score */}
            <div
              className="rounded-2xl p-4 flex items-center gap-4"
              style={{ background: 'linear-gradient(135deg, #e0ede0, #d5f3f3)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse-glow"
                style={{ background: 'linear-gradient(135deg, #2d5f2d, #0d9488)' }}
              >
                <Star className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-lg" style={{ color: '#3a2a10' }}>
                  Trust Score
                </p>
                <p className="text-sm" style={{ color: '#7a5e3a' }}>
                  Build your traveller reputation
                </p>
                <button
                  type="button"
                  onClick={() => navigate({ to: '/traveller/trust' })}
                  className="text-xs font-semibold mt-1"
                  style={{ color: '#0d9488' }}
                >
                  View Dashboard →
                </button>
              </div>
            </div>

            {/* Favourites */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5" style={{ color: '#e8612c' }} />
                <h2 className="font-display text-lg font-semibold" style={{ color: '#0d9488' }}>
                  Favourites
                </h2>
              </div>
              {savedFavoriteDestinations.length === 0 ? (
                <p className="text-sm text-center py-6" style={{ color: '#9a7a4e' }}>
                  ❤️ No saved favourites yet. Tap the heart on any destination!
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {savedFavoriteDestinations.map((dest, i) => (
                    <div
                      key={dest.id}
                      className="animate-fadeSlideIn"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <DestinationCard destination={dest} variant="grid" />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Explored */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5" style={{ color: '#0d9488' }} />
                <h2 className="font-display text-lg font-semibold" style={{ color: '#0d9488' }}>
                  Explored Destinations
                </h2>
              </div>
              {exploredDestinations.length === 0 ? (
                <p className="text-sm text-center py-6" style={{ color: '#9a7a4e' }}>
                  🗺️ No explorations logged yet. Request an experience to get started!
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {exploredDestinations.map((dest, i) => (
                    <div
                      key={dest.id}
                      className="animate-fadeSlideIn"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <DestinationCard destination={dest} variant="grid" />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-md"
              style={{ background: '#fde5d0', color: '#e8612c' }}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </>
        )}
      </div>

      <BottomNavigation activeTab="profile" />
    </div>
  );
}
