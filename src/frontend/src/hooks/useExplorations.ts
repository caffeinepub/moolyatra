import { useInternetIdentity } from './useInternetIdentity';
import { useGetCallerUserProfile, useAddPastExploration } from './useQueries';
import { getLocalExplorations } from '../utils/localStorageCache';
import { DESTINATIONS } from '../data/destinations';

export function useExplorations() {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const addExplorationMutation = useAddPastExploration();

  const getExplorationIds = (): string[] => {
    if (identity && userProfile) {
      return userProfile.pastExplorations
        .map(idx => DESTINATIONS[Number(idx)]?.id)
        .filter(Boolean) as string[];
    }
    return getLocalExplorations();
  };

  const logExploration = (destinationId: string) => {
    const destIndex = DESTINATIONS.findIndex(d => d.id === destinationId);
    if (destIndex === -1) return;
    addExplorationMutation.mutate(destIndex);
  };

  return {
    explorationIds: getExplorationIds(),
    logExploration,
    isLoading: addExplorationMutation.isPending,
  };
}
