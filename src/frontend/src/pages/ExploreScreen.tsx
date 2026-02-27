import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import BottomNavigation from '../components/BottomNavigation';
import { DESTINATIONS } from '../data/destinations';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'culturalImmersion', label: 'Cultural' },
  { value: 'natureEco', label: 'Nature & Eco' },
  { value: 'foodTrails', label: 'Food Trails' },
  { value: 'villageStays', label: 'Village Stays' },
];

export default function ExploreScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minTrust, setMinTrust] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = DESTINATIONS.filter((d) => {
    const matchSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'all' || d.category === selectedCategory;
    const matchTrust = d.trustScore >= minTrust;
    return matchSearch && matchCat && matchTrust;
  });

  return (
    <div className="min-h-screen pb-20" style={{ background: 'linear-gradient(to bottom, #fdfcf8, #faf7ef)' }}>
      {/* Header */}
      <div
        className="relative px-4 pt-12 pb-5"
        style={{ background: 'linear-gradient(135deg, #2d5f2d 0%, #0d9488 100%)' }}
      >
        {/* Logo watermark */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <img
            src="/assets/generated/moolyatra-logo-transparent.dim_400x400.png"
            alt="MoolYatra"
            className="h-7 w-7 object-contain brightness-200 opacity-90"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/generated/moolyatra-logo.dim_256x256.png';
            }}
          />
          <span className="text-white font-display font-semibold text-sm opacity-90">Explore</span>
        </div>

        <div className="mt-6">
          <h1 className="text-white font-display text-2xl font-bold">Find Your Journey</h1>
          <p className="text-white/70 text-sm mt-0.5">Authentic destinations across India</p>
        </div>

        {/* Search */}
        <div className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 shadow-md"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-3 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            {showFilters ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="px-4 py-4 border-b" style={{ background: '#faf7ef', borderColor: '#e0ede0' }}>
          <div className="mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#7a5e3a' }}>
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                  style={
                    selectedCategory === cat.value
                      ? { background: 'linear-gradient(135deg, #e8612c, #f5a623)', color: '#fff' }
                      : { background: '#e0ede0', color: '#2d5f2d' }
                  }
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#7a5e3a' }}>
              Min Trust Score: {minTrust.toFixed(1)}
            </p>
            <input
              type="range"
              min={0}
              max={5}
              step={0.5}
              value={minTrust}
              onChange={(e) => setMinTrust(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Category pills */}
      {!showFilters && (
        <div className="px-4 py-3 flex gap-2 overflow-x-auto stories-container">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={
                selectedCategory === cat.value
                  ? { background: 'linear-gradient(135deg, #e8612c, #f5a623)', color: '#fff' }
                  : { background: '#e0ede0', color: '#2d5f2d' }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      <div className="px-4 py-4">
        <p className="text-xs font-medium mb-3" style={{ color: '#9a7a4e' }}>
          {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🌿</p>
            <p className="font-display font-semibold" style={{ color: '#3a2a10' }}>
              No destinations found
            </p>
            <p className="text-sm mt-1" style={{ color: '#9a7a4e' }}>
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((dest, i) => (
              <div
                key={dest.id}
                className="animate-fadeSlideIn"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <DestinationCard destination={dest} variant="grid" />
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation activeTab="explore" />
    </div>
  );
}
