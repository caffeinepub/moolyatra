import type { Destination } from '../data/destinations';

const CACHE_KEYS = {
  DESTINATIONS: 'moolyatra_destinations',
  DESTINATION_DETAIL: 'moolyatra_destination_',
  USER_ROLE: 'moolyatra_user_role',
  FAVORITES: 'moolyatra_favorites',
  EXPLORATIONS: 'moolyatra_explorations',
};

export function cacheDestinations(destinations: Destination[]): void {
  try {
    localStorage.setItem(CACHE_KEYS.DESTINATIONS, JSON.stringify(destinations));
  } catch {
    // Storage might be full or unavailable
  }
}

export function getCachedDestinations(): Destination[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEYS.DESTINATIONS);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

export function cacheDestinationDetail(id: string, detail: Destination): void {
  try {
    localStorage.setItem(CACHE_KEYS.DESTINATION_DETAIL + id, JSON.stringify(detail));
  } catch {
    // Storage might be full or unavailable
  }
}

export function getCachedDestinationDetail(id: string): Destination | null {
  try {
    const cached = localStorage.getItem(CACHE_KEYS.DESTINATION_DETAIL + id);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}

export function saveUserRole(role: 'traveller' | 'host'): void {
  try {
    localStorage.setItem(CACHE_KEYS.USER_ROLE, role);
  } catch {
    // ignore
  }
}

export function getUserRole(): 'traveller' | 'host' | null {
  try {
    const role = localStorage.getItem(CACHE_KEYS.USER_ROLE);
    return role as 'traveller' | 'host' | null;
  } catch {
    return null;
  }
}

export function saveLocalFavorites(ids: string[]): void {
  try {
    localStorage.setItem(CACHE_KEYS.FAVORITES, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function getLocalFavorites(): string[] {
  try {
    const cached = localStorage.getItem(CACHE_KEYS.FAVORITES);
    return cached ? JSON.parse(cached) : [];
  } catch {
    return [];
  }
}

export function saveLocalExplorations(ids: string[]): void {
  try {
    localStorage.setItem(CACHE_KEYS.EXPLORATIONS, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function getLocalExplorations(): string[] {
  try {
    const cached = localStorage.getItem(CACHE_KEYS.EXPLORATIONS);
    return cached ? JSON.parse(cached) : [];
  } catch {
    return [];
  }
}
