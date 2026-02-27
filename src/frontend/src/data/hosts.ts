export interface HostTrustIndex {
  experienceQuality: number;
  safety: number;
  communityRating: number;
}

export interface Host {
  id: string;
  name: string;
  location: string;
  role: string;
  verified: boolean;
  safetyCompliance: boolean;
  trustIndex: HostTrustIndex;
  bio: string;
  languages: string[];
  yearsActive: number;
  destinationIds: string[];
  avatar: string;
}

export const HOSTS: Host[] = [
  {
    id: 'meera-sharma',
    name: 'Meera Sharma',
    location: 'Wayanad, Kerala',
    role: 'Kerala Community Host',
    verified: true,
    safetyCompliance: true,
    trustIndex: {
      experienceQuality: 4.8,
      safety: 5.0,
      communityRating: 4.6,
    },
    bio: 'Born and raised in the Wayanad highlands, Meera has been welcoming travellers into her family\'s spice farm for over 8 years. She is a certified community ambassador and has trained 12 other local hosts in responsible tourism practices.',
    languages: ['Malayalam', 'English', 'Hindi'],
    yearsActive: 8,
    destinationIds: ['araku-valley'],
    avatar: '/assets/generated/meera-sharma-host.dim_400x400.png',
  },
  {
    id: 'raju-apatani',
    name: 'Raju Tage',
    location: 'Ziro, Arunachal Pradesh',
    role: 'Apatani Cultural Guide',
    verified: true,
    safetyCompliance: true,
    trustIndex: {
      experienceQuality: 4.9,
      safety: 4.8,
      communityRating: 4.7,
    },
    bio: 'Raju is an Apatani elder who has dedicated his life to preserving his community\'s agricultural traditions. He leads immersive farm-stay experiences and teaches visitors about the Apatani\'s UNESCO-recognized land management practices.',
    languages: ['Apatani', 'Hindi', 'English'],
    yearsActive: 12,
    destinationIds: ['ziro-valley'],
    avatar: '/assets/generated/meera-sharma-host.dim_400x400.png',
  },
  {
    id: 'priya-das',
    name: 'Priya Das',
    location: 'Majuli, Assam',
    role: 'Sattriya Arts Host',
    verified: true,
    safetyCompliance: true,
    trustIndex: {
      experienceQuality: 4.7,
      safety: 4.9,
      communityRating: 4.8,
    },
    bio: 'Priya runs a traditional bamboo homestay near the Auniati Satra monastery. She organizes mask-making workshops and Sattriya dance performances, connecting visitors with the living heritage of Majuli\'s monastic culture.',
    languages: ['Assamese', 'Bengali', 'English'],
    yearsActive: 6,
    destinationIds: ['majuli'],
    avatar: '/assets/generated/meera-sharma-host.dim_400x400.png',
  },
];

export function getHostById(id: string): Host | undefined {
  return HOSTS.find(h => h.id === id);
}
