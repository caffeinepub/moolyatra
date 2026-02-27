import { useNavigate } from '@tanstack/react-router';
import { Home, Compass, PlayCircle, Shield, User } from 'lucide-react';

type Tab = 'home' | 'explore' | 'stories' | 'trust' | 'profile';

interface BottomNavigationProps {
  activeTab: Tab;
}

const TABS: { id: Tab; label: string; icon: React.ElementType; route: string }[] = [
  { id: 'home', label: 'Home', icon: Home, route: '/traveller/home' },
  { id: 'explore', label: 'Explore', icon: Compass, route: '/traveller/explore' },
  { id: 'stories', label: 'Stories', icon: PlayCircle, route: '/traveller/stories' },
  { id: 'trust', label: 'Trust', icon: Shield, route: '/traveller/trust' },
  { id: 'profile', label: 'Profile', icon: User, route: '/traveller/profile' },
];

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const navigate = useNavigate();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 border-t"
      style={{
        background: 'linear-gradient(to right, #1a341a, #0a7a70)',
        borderColor: 'rgba(255,255,255,0.1)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      }}
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() =>
              navigate({
                to: tab.route as
                  | '/traveller/home'
                  | '/traveller/explore'
                  | '/traveller/stories'
                  | '/traveller/trust'
                  | '/traveller/profile',
              })
            }
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-0"
            style={{
              background: isActive ? 'rgba(245,166,35,0.25)' : 'transparent',
            }}
          >
            <div
              className="relative"
              style={{
                color: isActive ? '#f5a623' : 'rgba(255,255,255,0.6)',
              }}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: '#f5a623' }}
                />
              )}
            </div>
            <span
              className="font-medium truncate"
              style={{
                color: isActive ? '#f5a623' : 'rgba(255,255,255,0.6)',
                fontSize: '10px',
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
