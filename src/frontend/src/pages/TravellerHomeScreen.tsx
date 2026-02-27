import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search, Shield, Leaf, ChevronRight } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import BottomNavigation from '../components/BottomNavigation';
import { DESTINATIONS } from '../data/destinations';

export default function TravellerHomeScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const featured = DESTINATIONS.slice(0, 3);
  const categories = [
    { label: 'Cultural', icon: '🏛️', color: '#e8612c', bg: '#fde5d0', id: 'culturalImmersion' },
    { label: 'Nature', icon: '🌿', color: '#2d5f2d', bg: '#e0ede0', id: 'natureEco' },
    { label: 'Food', icon: '🍛', color: '#d4891e', bg: '#faefd0', id: 'foodTrails' },
    { label: 'Village', icon: '🏡', color: '#0d9488', bg: '#d5f3f3', id: 'villageStays' },
  ];

  const filteredDestinations = DESTINATIONS.filter((d) =>
    searchQuery
      ? d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.region.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="min-h-screen pb-20" style={{ background: 'linear-gradient(to bottom, #fdfcf8, #faf7ef)' }}>
      {/* Header */}
      <div
        className="relative px-4 pt-12 pb-6"
        style={{ background: 'linear-gradient(135deg, #2d5f2d 0%, #0d9488 100%)' }}
      >
        {/* Logo watermark top-left */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <img
            src="/assets/generated/moolyatra-logo-transparent.dim_400x400.png"
            alt="MoolYatra"
            className="h-8 w-8 object-contain brightness-200 opacity-90"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/generated/moolyatra-logo.dim_256x256.png';
            }}
          />
          <span className="text-white font-display font-semibold text-sm opacity-90">MoolYatra</span>
        </div>

        <div className="mt-6">
          <p className="text-white/80 text-sm font-body">Good day, Explorer 🌿</p>
          <h1 className="text-white font-display text-2xl font-bold mt-0.5">
            Discover India Beyond the Crowd
          </h1>
        </div>

        {/* Search bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search destinations, experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 shadow-md"
          />
        </div>
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold" style={{ color: '#3a2a10' }}>
              Explore by Category
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.label}
                onClick={() =>
                  navigate({ to: '/traveller/explore', search: { q: '', category: cat.id } })
                }
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: cat.bg }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-semibold" style={{ color: cat.color }}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured destinations */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold" style={{ color: '#3a2a10' }}>
              Featured Destinations
            </h2>
            <button
              type="button"
              onClick={() => navigate({ to: '/traveller/explore', search: { q: '', category: '' } })}
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: '#0d9488' }}
            >
              See all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 stories-container">
            {featured.map((dest, i) => (
              <div
                key={dest.id}
                className="flex-shrink-0 w-64 animate-fadeSlideIn"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <DestinationCard destination={dest} variant="featured" />
              </div>
            ))}
          </div>
        </section>

        {/* Trust banner */}
        <section
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #2d5f2d, #0d9488)' }}
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-display font-semibold text-sm">Every Host is Verified</p>
            <p className="text-white/80 text-xs mt-0.5">
              Community-reviewed, safety-certified destinations
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate({ to: '/traveller/trust' })}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition-colors"
          >
            Learn
          </button>
        </section>

        {/* All destinations */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-lg font-semibold" style={{ color: '#3a2a10' }}>
              All Destinations
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredDestinations.map((dest, i) => (
              <div
                key={dest.id}
                className="animate-fadeSlideIn"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <DestinationCard destination={dest} variant="grid" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="px-4 py-6 text-center border-t" style={{ borderColor: '#e0ede0' }}>
        <div className="flex items-center justify-center gap-1 text-xs" style={{ color: '#9a7a4e' }}>
          <Leaf className="w-3 h-3" style={{ color: '#e8612c' }} />
          <span>
            © {new Date().getFullYear()} Built with love using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'moolyatra')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: '#2d5f2d' }}
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>

      <BottomNavigation activeTab="home" />
    </div>
  );
}
