import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Leaf, Users, LogIn, Loader2, Shield } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useCreateUserProfile } from '../hooks/useQueries';
import { UserRole } from '../backend';

type Step = 'login' | 'role';

export default function UserSelectionScreen() {
  const navigate = useNavigate();
  const { identity, login, isLoggingIn, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const createProfile = useCreateUserProfile();
  const [step, setStep] = useState<Step>('login');

  // If already logged in and has a profile, go straight to traveller home
  useEffect(() => {
    if (identity && userProfile) {
      navigate({ to: '/traveller/home' });
    } else if (identity && !profileLoading) {
      // Logged in but no profile yet – show role selection
      setStep('role');
    }
  }, [identity, userProfile, profileLoading, navigate]);

  const handleRoleSelect = async (role: UserRole) => {
    if (!identity) return;
    const displayName = identity.getPrincipal().toString().slice(0, 12) + '...';
    try {
      await createProfile.mutateAsync({ role, displayName });
    } catch {
      // If profile already exists, that's fine — just navigate
    }
    if (role === UserRole.traveller) {
      navigate({ to: '/traveller/home' });
    } else {
      navigate({ to: '/host/onboarding' });
    }
  };

  const isCreating = createProfile.isPending;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between py-12 px-6"
      style={{
        background: 'linear-gradient(to bottom, #fdfcf8 0%, #faf7ef 50%, #f5eedc 100%)',
      }}
    >
      {/* Top logo section */}
      <div className="flex flex-col items-center gap-3 pt-8 animate-fadeSlideIn">
        <img
          src="/assets/generated/moolyatra-logo-transparent.dim_400x400.png"
          alt="MoolYatra Logo"
          className="w-28 h-28 object-contain drop-shadow-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/moolyatra-logo.dim_256x256.png';
          }}
        />
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold" style={{ color: '#3a2a10' }}>
            MoolYatra
          </h1>
          <p className="text-sm font-medium mt-0.5" style={{ color: '#9a7a4e' }}>
            Rooted in Trust.
          </p>
        </div>
      </div>

      {/* Main action area */}
      <div className="w-full max-w-sm flex flex-col gap-5 animate-fadeSlideIn" style={{ animationDelay: '150ms' }}>
        {step === 'login' || (!identity && !isInitializing) ? (
          <>
            <h2 className="text-center text-xl font-display font-semibold" style={{ color: '#3a2a10' }}>
              Welcome to MoolYatra
            </h2>
            <p className="text-center text-sm" style={{ color: '#7a5e3a' }}>
              Sign in to discover, save, and explore India's most authentic destinations.
            </p>

            {/* Internet Identity login button */}
            <button
              type="button"
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              className="relative w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 login-glow"
              style={{
                background: 'linear-gradient(135deg, #2d5f2d, #0d9488)',
                borderColor: 'transparent',
                color: '#fff',
              }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                {isLoggingIn ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <LogIn className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="text-left flex-1">
                <div className="font-display font-bold text-lg">
                  {isLoggingIn ? 'Signing in...' : 'Sign In'}
                </div>
                <div className="text-sm opacity-90">Secure Internet Identity login</div>
              </div>
              {!isLoggingIn && <div className="text-white/70">→</div>}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: '#e0ede0' }} />
              <span className="text-xs" style={{ color: '#9a7a4e' }}>or continue as guest</span>
              <div className="flex-1 h-px" style={{ background: '#e0ede0' }} />
            </div>

            {/* Guest / browse options */}
            <button
              type="button"
              onClick={() => navigate({ to: '/traveller/home' })}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: 'transparent',
                borderColor: '#e0ede0',
                color: '#3a2a10',
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#fde5d0' }}>
                <Leaf className="w-5 h-5" style={{ color: '#e8612c' }} />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-sm">Browse as Traveller</div>
                <div className="text-xs" style={{ color: '#9a7a4e' }}>No account needed</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate({ to: '/host/onboarding' })}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: 'transparent',
                borderColor: '#e0ede0',
                color: '#3a2a10',
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#e0ede0' }}>
                <Users className="w-5 h-5" style={{ color: '#2d5f2d' }} />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-sm">Community Host Onboarding</div>
                <div className="text-xs" style={{ color: '#9a7a4e' }}>Join as a host</div>
              </div>
            </button>
          </>
        ) : (
          /* Role selection after successful login */
          <>
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: 'linear-gradient(135deg, #e0ede0, #d5f3f3)' }}
              >
                <Shield className="w-7 h-7" style={{ color: '#0d9488' }} />
              </div>
              <h2 className="text-xl font-display font-semibold" style={{ color: '#3a2a10' }}>
                How would you like to explore?
              </h2>
              <p className="text-sm mt-1" style={{ color: '#9a7a4e' }}>
                Choose your role to personalize your experience
              </p>
            </div>

            {/* Traveller button */}
            <button
              type="button"
              onClick={() => handleRoleSelect(UserRole.traveller)}
              disabled={isCreating}
              className="group relative w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #e8612c, #f5a623)',
                borderColor: 'transparent',
                color: '#fff',
              }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                {isCreating ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Leaf className="w-6 h-6 text-white" />}
              </div>
              <div className="text-left flex-1">
                <div className="font-display font-bold text-lg">I am a Traveller</div>
                <div className="text-sm opacity-90">Discover authentic destinations</div>
              </div>
              <div className="ml-auto text-white/70 group-hover:translate-x-1 transition-transform">→</div>
            </button>

            {/* Host button */}
            <button
              type="button"
              onClick={() => handleRoleSelect(UserRole.host)}
              disabled={isCreating}
              className="group relative w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #2d5f2d, #0d9488)',
                borderColor: 'transparent',
                color: '#fff',
              }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-display font-bold text-lg">I am a Community Host</div>
                <div className="text-sm opacity-90">Share your culture & place</div>
              </div>
              <div className="ml-auto text-white/70 group-hover:translate-x-1 transition-transform">→</div>
            </button>
          </>
        )}
      </div>

      {/* Footer tagline */}
      <div className="flex items-center gap-3 animate-fadeSlideIn" style={{ animationDelay: '300ms' }}>
        {['Verified', 'Responsible', 'Sustainable'].map((word, i) => (
          <span key={word} className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#7a5e3a' }}>
              {word}
            </span>
            {i < 2 && <span style={{ color: '#d4891e' }}>•</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
