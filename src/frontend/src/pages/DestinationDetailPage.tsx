import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, MapPin, Star, Shield, Users, Calendar, Cloud, Tag, CheckCircle, Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import TrustBadge from '../components/TrustBadge';
import BottomNavigation from '../components/BottomNavigation';
import { DESTINATIONS } from '../data/destinations';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useActor } from '../hooks/useActor';
import { useFavorites } from '../hooks/useFavorites';

export default function DestinationDetailPage() {
  const { id } = useParams({ from: '/destination/$id' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isRequesting, setIsRequesting] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);

  const destination = DESTINATIONS.find((d) => d.id === id);
  const destIndex = DESTINATIONS.findIndex((d) => d.id === id);
  const isFav = isFavorite(id);

  const handleToggleFavorite = () => {
    toggleFavorite(id);
    setHeartAnimating(true);
    setTimeout(() => setHeartAnimating(false), 400);
    if (!isFav) {
      toast.success('Added to favourites!');
    }
  };

  const handleRequestExperience = async () => {
    if (!identity || !actor) {
      toast.error('Please sign in to request an experience');
      return;
    }
    setIsRequesting(true);
    try {
      await actor.submitExperienceRequest({
        destinationId: BigInt(destIndex),
        message: '',
      });
      toast.success('Experience request sent! The host will contact you soon.');
    } catch (err) {
      toast.error('Failed to send request. Please try again.');
      console.error(err);
    } finally {
      setIsRequesting(false);
    }
  };

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#fdfcf8' }}>
        <div className="text-center">
          <p className="text-4xl mb-3">🌿</p>
          <p className="font-display font-semibold" style={{ color: '#3a2a10' }}>
            Destination not found
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: '/traveller/home' })}
            className="mt-4 text-sm"
            style={{ color: '#0d9488' }}
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const breakdown = destination.trustBreakdown;

  return (
    <div className="min-h-screen pb-24" style={{ background: '#fdfcf8' }}>
      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate({ to: '/traveller/home' })}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Favourite button */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`absolute top-12 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white/30 ${heartAnimating ? 'heart-pulse' : ''}`}
        >
          <Heart
            className="w-5 h-5"
            style={isFav ? { fill: '#e8612c', color: '#e8612c' } : { color: '#fff' }}
          />
        </button>

        {/* Hero content */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {destination.safetyCertified && <TrustBadge type="verified" size="sm" />}
            <TrustBadge type="community" size="sm" />
          </div>
          <h1 className="text-white font-display text-2xl font-bold">{destination.name}</h1>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4 text-white/80" />
            <span className="text-white/80 text-sm">{destination.region}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* Trust overview */}
        <div
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #e0ede0, #d5f3f3)' }}
        >
          <div className="flex-shrink-0 text-center">
            <div className="font-display text-3xl font-bold" style={{ color: '#2d5f2d' }}>
              {destination.trustScore.toFixed(1)}
            </div>
            <div className="flex items-center gap-0.5 justify-center mt-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-3 h-3"
                  style={{
                    fill: s <= Math.round(destination.trustScore) ? '#f5a623' : 'transparent',
                    color: '#f5a623',
                  }}
                />
              ))}
            </div>
            <div className="text-xs mt-0.5" style={{ color: '#7a5e3a' }}>
              Trust Score
            </div>
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2 text-sm" style={{ color: '#2d5f2d' }}>
              <Users className="w-4 h-4" />
              <span>{destination.verifiedHostCount} Verified Hosts</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#0d9488' }}>
              <Shield className="w-4 h-4" />
              <span>{destination.safetyCertified ? 'Safety Certified' : 'Community Reviewed'}</span>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-3 my-2">
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #d4891e, transparent)' }}
          />
          <img
            src="/assets/generated/section-divider.dim_800x48.png"
            alt=""
            className="h-8 w-auto opacity-70"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #d4891e, transparent)' }}
          />
        </div>

        {/* About */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-2" style={{ color: '#0d9488' }}>
            About This Destination
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: '#5a4428' }}>
            {destination.story}
          </p>
        </section>

        {/* Trust breakdown */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: '#0d9488' }}>
            Trust Breakdown
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Verification Score', value: breakdown.verificationScore, color: '#2d5f2d' },
              { label: 'Safety Compliance', value: breakdown.safetyCompliance, color: '#e8612c' },
              { label: 'Community Rating', value: breakdown.communityRating, color: '#0d9488' },
              { label: 'Experience Authenticity', value: breakdown.experienceAuthenticity, color: '#d4891e' },
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

        {/* Decorative divider */}
        <div className="flex items-center gap-3 my-2">
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #d4891e, transparent)' }}
          />
          <span style={{ color: '#d4891e', fontSize: '18px' }}>✦</span>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #d4891e, transparent)' }}
          />
        </div>

        {/* Trust features */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: '#0d9488' }}>
            What Makes It Trusted
          </h2>
          <div className="space-y-2">
            {destination.trustFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm" style={{ color: '#3a2a10' }}>
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#0d9488' }} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Weather & Events */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: '#0d9488' }}>
            Weather & Local Events
          </h2>
          {/* Weather */}
          <div
            className="rounded-xl p-3 flex items-center gap-3 mb-3"
            style={{ background: '#faefd0' }}
          >
            <span className="text-2xl">{destination.weather.icon}</span>
            <div>
              <p className="text-sm font-bold" style={{ color: '#3a2a10' }}>
                {destination.weather.temp} — {destination.weather.condition}
              </p>
              <p className="text-xs" style={{ color: '#7a5e3a' }}>Current conditions</p>
            </div>
            <Cloud className="w-5 h-5 ml-auto" style={{ color: '#d4891e' }} />
          </div>
          {/* Events */}
          {destination.events.map((event) => (
            <div
              key={event.name}
              className="rounded-xl p-3 flex items-start gap-3 mb-2"
              style={{ background: '#fde5d0' }}
            >
              <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#e8612c' }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: '#3a2a10' }}>{event.name}</p>
                <p className="text-xs font-medium" style={{ color: '#e8612c' }}>{event.date}</p>
                <p className="text-xs mt-0.5" style={{ color: '#7a5e3a' }}>{event.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Tags */}
        <section>
          <div className="flex flex-wrap gap-2">
            {destination.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: '#e0ede0', color: '#2d5f2d' }}
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2 z-40">
        <button
          type="button"
          disabled={isRequesting}
          className="w-full py-4 rounded-2xl font-display font-bold text-white text-base shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #e8612c, #f5a623)' }}
          onClick={handleRequestExperience}
        >
          {isRequesting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : null}
          {isRequesting ? 'Sending Request...' : '✨ Request Experience'}
        </button>
      </div>

      <BottomNavigation activeTab="explore" />
    </div>
  );
}
