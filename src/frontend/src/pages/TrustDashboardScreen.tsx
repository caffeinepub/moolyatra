import { useNavigate } from '@tanstack/react-router';
import { Shield, Star, Users, CheckCircle, TrendingUp, Info } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import BottomNavigation from '../components/BottomNavigation';

const TRUST_DATA = [
  { name: 'Host Verification', value: 35, color: '#0d9488' },
  { name: 'Community Reviews', value: 30, color: '#2d5f2d' },
  { name: 'Safety Ratings', value: 20, color: '#e8612c' },
  { name: 'Platform Approval', value: 15, color: '#f5a623' },
];

const DIMENSIONS = [
  {
    title: 'Host Verification',
    score: 4.8,
    icon: Shield,
    color: '#0d9488',
    bg: '#d5f3f3',
    desc: 'All hosts undergo identity verification, background checks, and community endorsement.',
  },
  {
    title: 'Community Reviews',
    score: 4.6,
    icon: Users,
    color: '#2d5f2d',
    bg: '#e0ede0',
    desc: 'Authentic reviews from verified travellers who have completed their journey.',
  },
  {
    title: 'Safety Ratings',
    score: 4.7,
    icon: CheckCircle,
    color: '#e8612c',
    bg: '#fde5d0',
    desc: 'Safety compliance checks, emergency protocols, and local authority coordination.',
  },
  {
    title: 'Platform Approval',
    score: 4.5,
    icon: Star,
    color: '#f5a623',
    bg: '#faefd0',
    desc: 'MoolYatra team review and approval of all listed destinations and experiences.',
  },
];

export default function TrustDashboardScreen() {
  const navigate = useNavigate();

  const overallScore = (DIMENSIONS.reduce((sum, d) => sum + d.score, 0) / DIMENSIONS.length).toFixed(1);

  return (
    <div className="min-h-screen pb-20" style={{ background: 'linear-gradient(to bottom, #fdfcf8, #faf7ef)' }}>
      {/* Header */}
      <div
        className="px-4 pt-12 pb-6"
        style={{ background: 'linear-gradient(135deg, #2d5f2d 0%, #0d9488 100%)' }}
      >
        <h1 className="text-white font-display text-2xl font-bold">Trust Dashboard</h1>
        <p className="text-white/70 text-sm mt-0.5">Transparency at every step</p>

        {/* Overall score */}
        <div className="mt-4 flex items-center gap-4 p-4 rounded-2xl bg-white/15 backdrop-blur-sm">
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-white">{overallScore}</div>
            <div className="text-white/70 text-xs mt-0.5">Overall Score</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-4 h-4"
                  style={{
                    fill: s <= Math.round(parseFloat(overallScore)) ? '#f5a623' : 'transparent',
                    color: '#f5a623',
                  }}
                />
              ))}
            </div>
            <p className="text-white/80 text-sm">Platform Trust Score</p>
            <p className="text-white/60 text-xs mt-0.5">Based on 4 key dimensions</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* Donut chart */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: '#0d9488' }}>
            Platform Trust Breakdown
          </h2>
          <div className="rounded-2xl p-4" style={{ background: '#fff', boxShadow: '0 4px 20px rgba(58,42,16,0.08)' }}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={TRUST_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {TRUST_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, '']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {TRUST_DATA.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-xs" style={{ color: '#7a5e3a' }}>
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dimension cards */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-3" style={{ color: '#0d9488' }}>
            Trust Statistics
          </h2>
          <div className="space-y-3">
            {DIMENSIONS.map((dim) => {
              const Icon = dim.icon;
              return (
                <div
                  key={dim.title}
                  className="rounded-2xl p-4"
                  style={{ background: '#fff', boxShadow: '0 2px 12px rgba(58,42,16,0.08)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: dim.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: dim.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm" style={{ color: '#3a2a10' }}>{dim.title}</span>
                        <span className="font-bold text-sm" style={{ color: dim.color }}>{dim.score}/5</span>
                      </div>
                      <div className="h-1.5 rounded-full mt-1.5 overflow-hidden" style={{ background: '#e0ede0' }}>
                        <div
                          className="h-full rounded-full animate-progress-fill"
                          style={{ width: `${(dim.score / 5) * 100}%`, background: dim.color, animationDelay: '200ms' }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#7a5e3a' }}>{dim.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How trust works */}
        <section
          className="rounded-2xl p-4"
          style={{ background: 'linear-gradient(135deg, #e0ede0, #d5f3f3)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5" style={{ color: '#0d9488' }} />
            <h2 className="font-display text-base font-semibold" style={{ color: '#0d9488' }}>
              How Trust Works
            </h2>
          </div>
          <div className="space-y-2">
            {[
              { step: '1', text: 'Hosts apply and submit verification documents' },
              { step: '2', text: 'Community members review and endorse the host' },
              { step: '3', text: 'MoolYatra team conducts safety compliance checks' },
              { step: '4', text: 'Travellers leave verified reviews after each visit' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                  style={{ background: '#0d9488' }}
                >
                  {item.step}
                </div>
                <p className="text-sm" style={{ color: '#3a2a10' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Platform stats */}
        <section>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Verified Hosts', value: '500+', icon: Shield, color: '#0d9488', bg: '#d5f3f3' },
              { label: 'Destinations', value: '120+', icon: TrendingUp, color: '#2d5f2d', bg: '#e0ede0' },
              { label: 'Happy Travellers', value: '10K+', icon: Users, color: '#e8612c', bg: '#fde5d0' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl p-3 text-center"
                  style={{ background: stat.bg }}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: stat.color }} />
                  <div className="font-display text-xl font-bold" style={{ color: '#3a2a10' }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: '#7a5e3a' }}>{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <BottomNavigation activeTab="trust" />
    </div>
  );
}
