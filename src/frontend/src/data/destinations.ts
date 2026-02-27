export type DestinationCategory = 'culturalImmersion' | 'natureEco' | 'foodTrails' | 'villageStays';

export interface WeatherInfo {
  temp: string;
  condition: string;
  icon: string;
}

export interface LocalEvent {
  name: string;
  date: string;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  state: string;
  trustScore: number;
  verifiedHostCount: number;
  safetyCertified: boolean;
  story: string;
  category: DestinationCategory;
  heroImage: string;
  trustBreakdown: {
    verificationScore: number;
    safetyCompliance: number;
    communityRating: number;
    experienceAuthenticity: number;
  };
  trustFeatures: string[];
  weather: WeatherInfo;
  events: LocalEvent[];
  tags: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'ziro-valley',
    name: 'Ziro Valley',
    region: 'Arunachal Pradesh',
    state: 'Arunachal',
    trustScore: 4.7,
    verifiedHostCount: 6,
    safetyCertified: true,
    story: 'Experience the ancient Apatani culture through guided farm visits, traditional rice wine ceremonies, and authentic homestays with indigenous families. Ziro Valley, a UNESCO World Heritage nominee, offers a rare window into one of India\'s most preserved tribal cultures, where the Apatani people have sustainably farmed the same terraced fields for centuries.',
    category: 'culturalImmersion',
    heroImage: '/assets/generated/ziro-valley.dim_800x600.png',
    trustBreakdown: {
      verificationScore: 4.8,
      safetyCompliance: 4.9,
      communityRating: 4.6,
      experienceAuthenticity: 4.7,
    },
    trustFeatures: ['Verified Host ID', 'Safety Checklist Passed', 'Community Ambassador Approved'],
    weather: { temp: '18°C', condition: 'Partly Cloudy', icon: '⛅' },
    events: [
      { name: 'Myoko Festival', date: 'March 2026', description: 'Annual Apatani harvest and friendship festival with traditional dances.' },
      { name: 'Ziro Music Festival', date: 'September 2026', description: 'Indie music festival set amidst the valley\'s lush paddy fields.' },
    ],
    tags: ['UNESCO Nominee', 'Tribal Culture', 'Rice Fields', 'Homestay'],
  },
  {
    id: 'araku-valley',
    name: 'Araku Valley',
    region: 'Andhra Pradesh',
    state: 'Andhra',
    trustScore: 4.6,
    verifiedHostCount: 8,
    safetyCertified: true,
    story: 'Nestled in the Eastern Ghats, Araku Valley is home to the Kondh and Bagata tribes who have cultivated some of India\'s finest organic coffee for generations. Walk through misty coffee plantations, visit tribal museums, and savour authentic Araku coffee brewed the traditional way. The valley\'s waterfalls and caves add a natural wonder to every journey.',
    category: 'natureEco',
    heroImage: '/assets/generated/araku-valley.dim_800x600.png',
    trustBreakdown: {
      verificationScore: 4.7,
      safetyCompliance: 4.8,
      communityRating: 4.5,
      experienceAuthenticity: 4.6,
    },
    trustFeatures: ['Verified Host ID', 'Safety Checklist Passed', 'Community Ambassador Approved'],
    weather: { temp: '22°C', condition: 'Sunny', icon: '☀️' },
    events: [
      { name: 'Coffee Harvest Walk', date: 'November 2025', description: 'Join tribal farmers during the annual coffee harvest season.' },
      { name: 'Tribal Art Fair', date: 'January 2026', description: 'Showcase of Kondh and Bagata traditional crafts and art.' },
    ],
    tags: ['Coffee Trails', 'Eastern Ghats', 'Tribal Art', 'Organic Farms'],
  },
  {
    id: 'majuli',
    name: 'Majuli',
    region: 'Assam',
    state: 'Assam',
    trustScore: 4.5,
    verifiedHostCount: 5,
    safetyCertified: true,
    story: 'Majuli, the world\'s largest river island, is a living cradle of Vaishnavite culture and Assamese heritage. Stay in traditional bamboo homes, witness mask-making by master craftsmen, and experience the Sattriya dance form at ancient monasteries. As the Brahmaputra shapes and reshapes this island, its communities have built a resilient, deeply spiritual way of life.',
    category: 'villageStays',
    heroImage: '/assets/generated/majuli.dim_800x600.png',
    trustBreakdown: {
      verificationScore: 4.6,
      safetyCompliance: 4.7,
      communityRating: 4.4,
      experienceAuthenticity: 4.8,
    },
    trustFeatures: ['Verified Host ID', 'Safety Checklist Passed', 'Community Ambassador Approved'],
    weather: { temp: '26°C', condition: 'Humid & Warm', icon: '🌤️' },
    events: [
      { name: 'Raas Mahotsav', date: 'November 2025', description: 'Grand Vaishnavite festival with Sattriya dance performances.' },
      { name: 'Mask Making Workshop', date: 'December 2025', description: 'Learn traditional bamboo mask crafting from master artisans.' },
    ],
    tags: ['River Island', 'Vaishnavite Culture', 'Bamboo Crafts', 'Sattriya Dance'],
  },
  {
    id: 'spiti-valley',
    name: 'Spiti Valley',
    region: 'Himachal Pradesh',
    state: 'Himachal',
    trustScore: 4.8,
    verifiedHostCount: 10,
    safetyCertified: true,
    story: 'The cold desert of Spiti sits at 12,500 feet, where ancient Buddhist monasteries cling to cliffsides and nomadic herders follow centuries-old routes. Stay with local families in traditional stone homes, trek to Key Monastery, and witness the stark beauty of a landscape that feels untouched by time.',
    category: 'natureEco',
    heroImage: '/assets/generated/spiti-valley.dim_800x600.png',
    trustBreakdown: {
      verificationScore: 4.9,
      safetyCompliance: 4.8,
      communityRating: 4.7,
      experienceAuthenticity: 4.8,
    },
    trustFeatures: ['Verified Host ID', 'Safety Checklist Passed', 'Community Ambassador Approved'],
    weather: { temp: '5°C', condition: 'Clear & Cold', icon: '❄️' },
    events: [
      { name: 'Losar Festival', date: 'February 2026', description: 'Tibetan New Year celebrations at Key Monastery.' },
    ],
    tags: ['High Altitude', 'Buddhist Culture', 'Cold Desert', 'Trekking'],
  },
  {
    id: 'chhattisgarh-bastar',
    name: 'Bastar',
    region: 'Chhattisgarh',
    state: 'Chhattisgarh',
    trustScore: 4.4,
    verifiedHostCount: 4,
    safetyCertified: true,
    story: 'Bastar is the heartland of Gondi tribal culture, where weekly haats (markets) bring together dozens of tribes in a vibrant exchange of crafts, food, and tradition. Explore dense sal forests, witness the Dussehra festival unlike anywhere else in India, and stay with Gond families who share their ancient knowledge of forest living.',
    category: 'culturalImmersion',
    heroImage: '/assets/generated/bastar.dim_800x600.jpg',
    trustBreakdown: {
      verificationScore: 4.5,
      safetyCompliance: 4.4,
      communityRating: 4.3,
      experienceAuthenticity: 4.6,
    },
    trustFeatures: ['Verified Host ID', 'Safety Checklist Passed', 'Community Ambassador Approved'],
    weather: { temp: '28°C', condition: 'Warm & Humid', icon: '🌿' },
    events: [
      { name: 'Bastar Dussehra', date: 'October 2025', description: '75-day tribal festival unique to Bastar, unlike any other in India.' },
    ],
    tags: ['Gondi Culture', 'Tribal Markets', 'Forest Stays', 'Crafts'],
  },
  {
    id: 'dzukou-valley',
    name: 'Dzükou Valley',
    region: 'Nagaland',
    state: 'Nagaland',
    trustScore: 4.6,
    verifiedHostCount: 3,
    safetyCertified: true,
    story: 'Known as the Valley of Flowers of the Northeast, Dzükou blooms with rare lilies found nowhere else on earth. Trek through Naga villages, share meals with Angami families, and camp under skies unpolluted by city light. The valley is a testament to the Naga people\'s deep bond with their land.',
    category: 'natureEco',
    heroImage: '/assets/generated/dzukou-valley.dim_800x600.jpg',
    trustBreakdown: {
      verificationScore: 4.7,
      safetyCompliance: 4.6,
      communityRating: 4.5,
      experienceAuthenticity: 4.7,
    },
    trustFeatures: ['Verified Host ID', 'Safety Checklist Passed', 'Community Ambassador Approved'],
    weather: { temp: '15°C', condition: 'Misty', icon: '🌫️' },
    events: [
      { name: 'Hornbill Festival', date: 'December 2025', description: 'Nagaland\'s grand cultural festival showcasing all Naga tribes.' },
    ],
    tags: ['Valley of Flowers', 'Naga Culture', 'Trekking', 'Camping'],
  },
  {
    id: 'mawlynnong',
    name: 'Mawlynnong',
    region: 'Meghalaya',
    state: 'Meghalaya',
    trustScore: 4.7,
    verifiedHostCount: 7,
    safetyCertified: true,
    story: 'Asia\'s cleanest village is a model of community-led sustainable tourism. The Khasi community of Mawlynnong has maintained their village with extraordinary pride, building living root bridges over centuries and welcoming travellers into their bamboo homes. Experience matrilineal culture, sacred forests, and the cleanest air in India.',
    category: 'villageStays',
    heroImage: '/assets/generated/mawlynnong.dim_800x600.jpg',
    trustBreakdown: {
      verificationScore: 4.8,
      safetyCompliance: 4.9,
      communityRating: 4.6,
      experienceAuthenticity: 4.7,
    },
    trustFeatures: ['Verified Host ID', 'Safety Checklist Passed', 'Community Ambassador Approved'],
    weather: { temp: '20°C', condition: 'Misty & Cool', icon: '🌧️' },
    events: [
      { name: 'Nongkrem Dance Festival', date: 'November 2025', description: 'Sacred Khasi thanksgiving festival with traditional dances.' },
    ],
    tags: ['Cleanest Village', 'Root Bridges', 'Khasi Culture', 'Eco Tourism'],
  },
  {
    id: 'hampi-food-trail',
    name: 'Hampi Food Trail',
    region: 'Karnataka',
    state: 'Karnataka',
    trustScore: 4.5,
    verifiedHostCount: 9,
    safetyCertified: true,
    story: 'Beyond the ruins of the Vijayanagara Empire lies a living food culture rooted in ancient temple traditions. Join local cooks in preparing banana-leaf feasts, learn the art of stone-ground spice blending, and trace the culinary heritage of a civilization that once fed millions. Hampi\'s food trail connects history, spirituality, and taste.',
    category: 'foodTrails',
    heroImage: '/assets/generated/hampi.dim_800x600.jpg',
    trustBreakdown: {
      verificationScore: 4.6,
      safetyCompliance: 4.5,
      communityRating: 4.4,
      experienceAuthenticity: 4.6,
    },
    trustFeatures: ['Verified Host ID', 'Safety Checklist Passed', 'Community Ambassador Approved'],
    weather: { temp: '30°C', condition: 'Hot & Sunny', icon: '☀️' },
    events: [
      { name: 'Hampi Utsav', date: 'November 2025', description: 'Three-day cultural festival with classical music and dance.' },
    ],
    tags: ['Temple Food', 'Heritage Cuisine', 'Spice Trails', 'UNESCO Site'],
  },
];

export const CATEGORIES = [
  { id: 'culturalImmersion', label: 'Cultural Immersion', icon: '🏛️', description: 'Tribal traditions & heritage' },
  { id: 'natureEco', label: 'Nature & Eco', icon: '🌿', description: 'Forests, valleys & wildlife' },
  { id: 'foodTrails', label: 'Food Trails', icon: '🍛', description: 'Authentic regional cuisine' },
  { id: 'villageStays', label: 'Village Stays', icon: '🏡', description: 'Rural homestays & community life' },
] as const;

export function getDestinationById(id: string): Destination | undefined {
  return DESTINATIONS.find(d => d.id === id);
}

export function getDestinationsByCategory(category: DestinationCategory): Destination[] {
  return DESTINATIONS.filter(d => d.category === category);
}

export function filterDestinations(
  destinations: Destination[],
  category: string | null,
  minTrustScore: number
): Destination[] {
  return destinations.filter(d => {
    const categoryMatch = !category || d.category === category;
    const scoreMatch = d.trustScore >= minTrustScore;
    return categoryMatch && scoreMatch;
  });
}
