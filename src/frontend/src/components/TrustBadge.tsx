interface TrustBadgeProps {
  type: 'verified' | 'community' | 'safety' | 'approval';
  label?: string;
  size?: 'sm' | 'md';
}

const BADGE_CONFIG = {
  verified: {
    emoji: '✅',
    label: 'Verified Host',
    bg: '#d5f3f3',
    text: '#0d9488',
    border: '#0d9488',
  },
  community: {
    emoji: '🤝',
    label: 'Community Approved',
    bg: '#e0ede0',
    text: '#2d5f2d',
    border: '#2d5f2d',
  },
  safety: {
    emoji: '🛡️',
    label: 'Safety Certified',
    bg: '#fde5d0',
    text: '#e8612c',
    border: '#e8612c',
  },
  approval: {
    emoji: '⭐',
    label: 'Top Rated',
    bg: '#faefd0',
    text: '#d4891e',
    border: '#d4891e',
  },
};

export default function TrustBadge({ type, label, size = 'md' }: TrustBadgeProps) {
  const config = BADGE_CONFIG[type];
  const displayLabel = label || config.label;

  const isSmall = size === 'sm';

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full font-semibold animate-shimmer animate-pulse-glow"
      style={{
        background: config.bg,
        color: config.text,
        border: `1.5px solid ${config.border}`,
        padding: isSmall ? '2px 8px' : '4px 12px',
        fontSize: isSmall ? '11px' : '13px',
      }}
    >
      <span>{config.emoji}</span>
      <span>{displayLabel}</span>
    </span>
  );
}
