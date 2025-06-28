export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  totalReviews: number;
  gamesAvailable: string[];
  tables: number;
  hours: string;
  phone: string;
  email: string;
  website?: string;
  image: string;
  description: string;
  features: string[];
}

export interface Dealer {
  id: string;
  name: string;
  experience: string;
  rating: number;
  totalReviews: number;
  specialties: string[];
  languages: string[];
  bio: string;
  image: string;
  storeIds: string[];
}

export interface Review {
  id: string;
  storeId?: string;
  dealerId?: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Job {
  id: string;
  storeId: string;
  storeName: string;
  title: string;
  type: 'Full-time' | 'Part-time';
  location: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  postedDate: string;
}