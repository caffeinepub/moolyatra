import { useNavigate } from '@tanstack/react-router';
import { MapPin, Star, ShieldCheck } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import type { Destination } from '../data/destinations';

interface DestinationCardProps {
  destination: Destination;
  variant?: 'featured' | 'grid';
  onClick?: () => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  culturalImmersion: { bg: '#fde5d0', text: '#e8612c' },
  natureEco: { bg: '#e0ede0', text: '#2d5f2d' },
  foodTrails: { bg: '#faefd0', text: '#d4891e' },
  villageStays: { bg: '#d5f3f3', text: '#0d9488' },
};

const CATEGORY_LABELS: Record<string, string> = {
  culturalImmersion: 'Cultural',
  natureEco: 'Nature & Eco',
  foodTrails: 'Food Trails',
  villageStays: 'Village Stay',
};

export default function DestinationCard({ destination, variant = 'grid', onClick }: DestinationCardProps) {
  const navigate = useNavigate();
  const catStyle = CATEGORY_COLORS[destination.category] || { bg: '#e0ede0', text: '#2d5f2d' };
  const catLabel = CATEGORY_LABELS[destination.category] || destination.category;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate({ to: '/destination/$id', params: { id: destination.id } });
    }
  };

  if (variant === 'featured') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 animate-fadeSlideIn text-left w-full border-0 p-0"
        style={{ background: '#fff', boxShadow: '0 4px 20px rgba(58,42,16,0.12)', minWidth: '240px' }}
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {destination.safetyCertified && (
            <div
              className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 text-xs font-semibold"
              style={{ color: '#0d9488' }}
            >
              <ShieldCheck className="w-3 h-3" />
              Verified
            </div>
          )}
          <div className="absolute bottom-2 left-2">
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: catStyle.bg, color: catStyle.text }}
            >
              {catLabel}
            </span>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-sm truncate" style={{ color: '#3a2a10' }}>
                {destination.name}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: '#9a7a4e' }} />
                <span className="text-xs truncate" style={{ color: '#9a7a4e' }}>
                  {destination.region}
                </span>
              </div>
            </div>
            <FavoriteButton destinationId={destination.id} size="sm" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3.5 h-3.5 fill-current" style={{ color: '#f5a623' }} />
            <span className="text-xs font-bold" style={{ color: '#d4891e' }}>
              {destination.trustScore.toFixed(1)}
            </span>
            <span className="text-xs" style={{ color: '#9a7a4e' }}>
              Trust Score
            </span>
          </div>
        </div>
      </button>
    );
  }

  // Grid variant
  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 animate-fadeSlideIn text-left w-full border-0 p-0"
      style={{ background: '#fff', boxShadow: '0 4px 20px rgba(58,42,16,0.12)' }}
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {destination.safetyCertified && (
          <div className="absolute top-2 right-2">
            <ShieldCheck className="w-4 h-4 text-white drop-shadow" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <FavoriteButton destinationId={destination.id} size="sm" />
        </div>
      </div>
      <div className="p-2.5">
        <h3 className="font-display font-semibold text-xs truncate" style={{ color: '#3a2a10' }}>
          {destination.name}
        </h3>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin className="w-2.5 h-2.5 flex-shrink-0" style={{ color: '#9a7a4e' }} />
          <span className="text-xs truncate" style={{ color: '#9a7a4e' }}>
            {destination.region}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3 h-3 fill-current" style={{ color: '#f5a623' }} />
          <span className="text-xs font-bold" style={{ color: '#d4891e' }}>
            {destination.trustScore.toFixed(1)}
          </span>
          <span
            className="ml-auto text-xs px-1.5 py-0.5 rounded-full font-semibold"
            style={{ background: catStyle.bg, color: catStyle.text }}
          >
            {catLabel}
          </span>
        </div>
      </div>
    </button>
  );
}
