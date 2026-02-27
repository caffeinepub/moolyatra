import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  destinationId: string;
  className?: string;
  size?: 'sm' | 'md';
}

export default function FavoriteButton({ destinationId, className, size = 'md' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoading } = useFavorites();
  const active = isFavorite(destinationId);
  const iconSize = size === 'sm' ? 16 : 20;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(destinationId);
      }}
      disabled={isLoading}
      className={cn(
        'rounded-full p-2 transition-all duration-200 shadow-sm',
        className
      )}
      style={{
        background: active ? 'rgba(210,105,30,0.15)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(4px)',
      }}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={iconSize}
        style={active ? { fill: '#d2691e', color: '#d2691e' } : { color: '#9ca3af' }}
      />
    </button>
  );
}
