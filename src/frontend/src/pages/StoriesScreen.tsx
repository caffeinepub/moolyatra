import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Volume2, VolumeX, ChevronUp, ChevronDown, MapPin, ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

const STORIES = [
  {
    id: 1,
    title: 'Ziro Valley',
    author: 'Tage Rita',
    tag: 'Cultural Immersion',
    tagColor: '#e8612c',
    tagBg: '#fde5d0',
    poster: '/assets/generated/ziro-story-poster-v2.dim_1080x1920.jpg',
    region: 'Arunachal Pradesh',
  },
  {
    id: 2,
    title: 'Araku Valley',
    author: 'Lakshmi Devi',
    tag: 'Nature & Eco',
    tagColor: '#2d5f2d',
    tagBg: '#e0ede0',
    poster: '/assets/generated/araku-story-poster.dim_1080x1920.png',
    region: 'Andhra Pradesh',
  },
  {
    id: 3,
    title: 'Majuli Island',
    author: 'Biren Das',
    tag: 'Village Stay',
    tagColor: '#0d9488',
    tagBg: '#d5f3f3',
    poster: '/assets/generated/majuli-story-poster-v2.dim_1080x1920.jpg',
    region: 'Assam',
  },
  {
    id: 4,
    title: 'Kerala Backwaters',
    author: 'Priya Nair',
    tag: 'Food Trails',
    tagColor: '#d4891e',
    tagBg: '#faefd0',
    poster: '/assets/generated/kerala-story-poster-v2.dim_1080x1920.jpg',
    region: 'Kerala',
  },
];

export default function StoriesScreen() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    if (index < 0 || index >= STORIES.length) return;
    setCurrentIndex(index);
    const container = containerRef.current;
    if (container) {
      const child = container.children[index] as HTMLElement | undefined;
      child?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(container.children).indexOf(entry.target as HTMLElement);
            if (idx !== -1) setCurrentIndex(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    Array.from(container.children).forEach((child) => { observer.observe(child); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-12 pb-4">
        <button
          type="button"
          onClick={() => navigate({ to: '/traveller/stories' })}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Progress dots */}
        <div className="flex gap-1.5">
          {STORIES.map((s) => (
            <button
              type="button"
              key={s.id}
              onClick={() => goTo(STORIES.indexOf(s))}
              className="rounded-full transition-all duration-300"
              style={{
                width: s.id - 1 === currentIndex ? '20px' : '6px',
                height: '6px',
                background: s.id - 1 === currentIndex ? '#f5a623' : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMuted(!muted)}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Stories container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-scroll stories-container snap-y snap-mandatory"
      >
        {STORIES.map((s, i) => (
          <div
            key={s.id}
            className="relative w-full flex-shrink-0 overflow-hidden snap-start"
            style={{ height: '100dvh' }}
          >
            <img
              src={s.poster}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Content overlay */}
            <div className="absolute bottom-24 left-4 right-16">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #e8612c, #f5a623)' }}
                >
                  {s.author[0]}
                </div>
                <span className="text-white font-semibold text-sm">{s.author}</span>
              </div>
              <h2 className="text-white font-display text-2xl font-bold mb-1">{s.title}</h2>
              <div className="flex items-center gap-1 mb-3">
                <MapPin className="w-3.5 h-3.5 text-white/70" />
                <span className="text-white/70 text-sm">{s.region}</span>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: s.tagBg, color: s.tagColor }}
              >
                {s.tag}
              </span>
            </div>

            {/* Side navigation */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-4">
              <button
                type="button"
                onClick={() => goTo(i - 1)}
                disabled={i === 0}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(i + 1)}
                disabled={i === STORIES.length - 1}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation activeTab="stories" />
    </div>
  );
}
