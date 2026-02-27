import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const navTimer = setTimeout(() => navigate({ to: '/user-selection' }), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #f5a623 0%, #faefd0 35%, #fdfcf8 70%, #f5eedc 100%)',
      }}
    >
      {/* Background splash image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/assets/generated/moolyatra-splash-bg.dim_1080x1920.png')" }}
      />

      {/* Warm glow overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 60% 20%, rgba(245,166,35,0.45) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center gap-6 px-8 transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Logo */}
        <div className="animate-fadeSlideIn" style={{ animationDelay: '0ms' }}>
          <img
            src="/assets/generated/moolyatra-logo-transparent.dim_400x400.png"
            alt="MoolYatra Logo"
            className="w-40 h-40 object-contain drop-shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/generated/moolyatra-logo.dim_256x256.png';
            }}
          />
        </div>

        {/* Brand name */}
        <div className="animate-fadeSlideIn text-center" style={{ animationDelay: '150ms' }}>
          <h1
            className="font-display text-5xl font-bold tracking-tight"
            style={{ color: '#3a2a10' }}
          >
            MoolYatra
          </h1>
          <p
            className="mt-1 text-lg font-medium tracking-wide"
            style={{ color: '#7a5e3a' }}
          >
            Rooted in Trust.
          </p>
        </div>

        {/* Tagline */}
        <div className="animate-fadeSlideIn" style={{ animationDelay: '300ms' }}>
          <p
            className="text-base text-center font-body"
            style={{ color: '#9a7a4e' }}
          >
            Discover India Beyond the Crowd
          </p>
        </div>

        {/* Loading dots */}
        <div className="animate-fadeSlideIn flex gap-2 mt-4" style={{ animationDelay: '500ms' }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: '#d4891e',
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
