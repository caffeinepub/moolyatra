import { useOfflineDetection } from '../hooks/useOfflineDetection';
import { WifiOff } from 'lucide-react';

export default function OfflineBanner() {
  const { isOffline } = useOfflineDetection();

  if (!isOffline) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 px-4 py-2 flex items-center justify-center gap-2 text-sm font-body font-medium shadow-md"
      style={{ background: '#d2691e', color: 'white' }}
    >
      <WifiOff size={16} />
      <span>You are offline — showing cached content</span>
    </div>
  );
}
