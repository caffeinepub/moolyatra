import { useInternetIdentity } from './useInternetIdentity';
import { useGetCallerUserProfile, useSaveFavorite } from './useQueries';
import { getLocalFavorites, saveLocalFavorites } from '../utils/localStorageCache';
import { DESTINATIONS } from '../data/destinations';

export function useFavorites() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const saveFavoriteMutation = useSaveFavorite();

  const getFavoriteIds = (): string[] => {
    if (identity && userProfile) {
      // Map backend bigint indices to destination IDs
      return userProfile.savedFavorites
        .map(idx => DESTINATIONS[Number(idx)]?.id)
        .filter(Boolean) as string[];
    }
    return getLocalFavorites();
  };

  const isFavorite = (destinationId: string): boolean => {
    const ids = getFavoriteIds();
    return ids.includes(destinationId);
  };

  const toggleFavorite = (destinationId: string) => {
    const destIndex = DESTINATIONS.findIndex(d => d.id === destinationId);
    if (destIndex === -1) return;

    if (!identity) {
      // Local storage toggle
      const current = getLocalFavorites();
      if (current.includes(destinationId)) {
        saveLocalFavorites(current.filter(id => id !== destinationId));
      } else {
        saveLocalFavorites([...current, destinationId]);
      }
      return;
    }

    saveFavoriteMutation.mutate(destIndex);
  };

  return {
    isFavorite,
    toggleFavorite,
    favoriteIds: getFavoriteIds(),
    isLoading: saveFavoriteMutation.isPending,
  };
}
