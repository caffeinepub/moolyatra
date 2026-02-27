import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, MapPin, Star, Shield, Users, MessageCircle, Globe } from 'lucide-react';
import TrustBadge from '../components/TrustBadge';
import BottomNavigation from '../components/BottomNavigation';

export default function HostProfilePage() {
  const navigate = useNavigate();

  const host = {
    name: 'Meera Sharma',
    location: 'Ziro Valley, Arunachal Pradesh',
    bio: 'Born and raised in the Apatani community, I have been welcoming travellers to experience our unique culture, traditional rice cultivation, and the breathtaking landscapes of Ziro Valley for over 8 years.',
    trustIndex: 4.8,
    verified: true,
    safetyCompliance: true,
    languages: ['English', 'Hindi', 'Apatani'],
    stats: { hosted: 142, reviews: 98, years: 8 },
    trustBreakdown: {
      verificationScore: 4.9,
      safetyCompliance: 4.7,
      communityRating: 4.8,
    },
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: '#fdfcf8' }}>
      {/* Header */}
      <div
        className="relative px-4 pt-12 pb-8"
        style={{ background: 'linear-gradient(135deg, #2d5f2d 0%, #0d9488 100%)' }}
      >
        <button
          type="button"
          onClick={() => navigate({ to: '/traveller/home' })}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mt-4">
          <div className="relative">
            <img
              src="/assets/generated/meera-sharma-host.dim_400x400.png"
              alt={host.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(host.name)}&background=2d5f2d&color=fff&size=200`;
              }}
            />
            {host.verified && (
              <div
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white"
                style={{ background: '#0d9488' }}
              >
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
          <h1 className="text-white font-display text-xl font-bold mt-3">{host.name}</h1>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-white/70" />
            <span className="text-white/70 text-sm">{host.location}</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-4 h-4 fill-current" style={{ color: '#f5a623' }} />
            <span className="text-white font-bold">{host.trustIndex}</span>
            <span className="text-white/70 text-sm ml-1">Trust Index</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {host.verified && <TrustBadge type="verified" />}
          {host.safetyCompliance && <TrustBadge type="safety" />}
          <TrustBadge type="community" />
          <TrustBadge type="approval" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Guests Hosted', value: host.stats.hosted, icon: Users, color: '#2d5f2d' },
            { label: 'Reviews', value: host.stats.reviews, icon: Star, color: '#f5a623' },
            { label: 'Years Active', value: host.stats.years, icon: Globe, color: '#0d9488' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl p-3 text-center"
                style={{ background: '#faf7ef', border: '1px solid #e0ede0' }}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: stat.color }} />
                <div className="font-display text-xl font-bold" style={{ color: '#3a2a10' }}>
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: '#9a7a4e' }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* About */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-2" style={{ color: '#0d9488' }}>
            About
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#5a4428' }}>
            {host.bio}
          </p>
        </section>

        {/* Trust metrics */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: '#0d9488' }}>
            Trust Metrics
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Verification Score', value: host.trustBreakdown.verificationScore, color: '#2d5f2d' },
              { label: 'Safety Compliance', value: host.trustBreakdown.safetyCompliance, color: '#e8612c' },
              { label: 'Community Rating', value: host.trustBreakdown.communityRating, color: '#0d9488' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1" style={{ color: '#7a5e3a' }}>
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.value.toFixed(1)}/5</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e0ede0' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(item.value / 5) * 100}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-2" style={{ color: '#0d9488' }}>
            Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {host.languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ background: '#d5f3f3', color: '#0d9488' }}
              >
                {lang}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2 z-40">
        <button
          className="w-full py-4 rounded-2xl font-display font-bold text-white text-base shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
          type="button"
          style={{ background: 'linear-gradient(135deg, #e8612c, #f5a623)' }}
          onClick={() => alert(`Connecting you with ${host.name}...`)}
        >
          <MessageCircle className="w-5 h-5" />
          Contact Host
        </button>
      </div>

      <BottomNavigation activeTab="home" />
    </div>
  );
}
