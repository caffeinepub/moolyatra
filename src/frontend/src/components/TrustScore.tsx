import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustScoreProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function TrustScore({ score, maxScore = 5, size = 'md', showLabel = true, className }: TrustScoreProps) {
  const sizeClasses = {
    sm: 'text-xs gap-0.5',
    md: 'text-sm gap-1',
    lg: 'text-base gap-1.5',
  };

  const iconSize = { sm: 10, md: 13, lg: 16 };

  return (
    <span className={cn('inline-flex items-center font-body font-semibold', sizeClasses[size], className)}
      style={{ color: '#d2691e' }}>
      <Star size={iconSize[size]} style={{ fill: '#d2691e', color: '#d2691e' }} />
      <span>{score.toFixed(1)}</span>
      {showLabel && <span className="text-muted-foreground font-normal">/{maxScore}</span>}
    </span>
  );
}
