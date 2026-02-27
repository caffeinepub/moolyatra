import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserProfileView, UserRole } from '../backend';
import { getLocalFavorites, saveLocalFavorites, getLocalExplorations, saveLocalExplorations } from '../utils/localStorageCache';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<UserProfileView | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useCreateUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ role, displayName }: { role: UserRole; displayName: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createUserProfile(role, displayName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfileView) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSaveFavorite() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (destinationIndex: number) => {
      if (!actor || !identity) {
        // Save locally if not authenticated
        const current = getLocalFavorites();
        const destId = String(destinationIndex);
        if (!current.includes(destId)) {
          saveLocalFavorites([...current, destId]);
        }
        return;
      }
      return actor.saveFavorite(BigInt(destinationIndex));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useAddPastExploration() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (destinationIndex: number) => {
      if (!actor || !identity) {
        // Save locally if not authenticated
        const current = getLocalExplorations();
        const destId = String(destinationIndex);
        if (!current.includes(destId)) {
          saveLocalExplorations([...current, destId]);
        }
        return;
      }
      return actor.addPastExploration(BigInt(destinationIndex));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
