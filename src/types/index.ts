export interface Job {
  id: string;
  store_id: string;
  title: string;
  description: string;
  employment_type: string;
  salary: {
    min: number;
    max: number;
    unit: string;
    currency: string;
  };
  location: {
    prefecture: string;
    city: string;
    address: string;
  };
  requirements: string[];
  benefits: string[];
  working_hours: {
    shifts: string[];
    days_per_week: string;
  };
  is_premium: boolean;
  posted_at: string;
  expires_at: string;
  status: 'active' | 'inactive' | 'expired';
  contact: {
    method: string;
    value: string;
  };
}

export interface Store {
  id: string;
  name: string;
  description: string;
  location: {
    prefecture: string;
    city: string;
    address: string;
    access: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  business_hours: {
    weekday: string;
    weekend: string;
    holidays: string;
  };
  features: string[];
  subscription: {
    status: 'active' | 'inactive';
    plan: 'free' | 'premium';
    expires_at: string;
  };
  ratings: {
    average: number;
    count: number;
  };
  created_at: string;
  updated_at: string;
}

export interface Dealer {
  id: string;
  name: string;
  display_name: string;
  profile: {
    experience_years: number;
    specialty: string[];
    certifications: string[];
    bio: string;
  };
  current_store_id: string | null;
  work_history: {
    store_id: string;
    store_name: string;
    period: {
      start: string;
      end: string | null;
    };
    position: string;
  }[];
  ratings: {
    average: number;
    count: number;
    breakdown: {
      professionalism: number;
      game_management: number;
      communication: number;
      fairness: number;
    };
  };
  availability: {
    status: 'employed' | 'seeking' | 'unavailable';
    open_to_offers: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  type: 'store' | 'dealer';
  target_id: string;
  reviewer_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  categories?: {
    professionalism?: number;
    game_management?: number;
    communication?: number;
    fairness?: number;
  };
  created_at: string;
  verified: boolean;
}