// User types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'agent' | 'admin';
  agency?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agency?: string;
  phone?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// Search criteria types
export interface SearchCriteria {
  minBudget?: number;
  maxBudget?: number;
  minSurface?: number;
  maxSurface?: number;
  location?: string;
  propertyType?: 'apartment' | 'house' | 'commercial' | 'land';
  rooms?: number;
}

// Prospect types
export interface Prospect {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'meeting_scheduled' | 'viewing_done' | 'offer_made' | 'closed' | 'lost';
  searchCriteria: SearchCriteria;
  notes?: string;
  assignedAgent: string;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  source?: 'website' | 'referral' | 'advertising' | 'social_media' | 'other';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProspectRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  searchCriteria: SearchCriteria;
  notes?: string;
  source?: string;
}

// Address types
export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  region?: string;
}

// Property types
export interface Property {
  id: string;
  title: string;
  description?: string;
  type: 'apartment' | 'house' | 'commercial' | 'land';
  status: 'available' | 'under_offer' | 'sold' | 'rented' | 'off_market';
  transactionType: 'sale' | 'rent';
  price: number;
  surface: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  address: Address;
  features?: string[];
  images?: string[];
  assignedAgent: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyRequest {
  title: string;
  description?: string;
  type: 'apartment' | 'house' | 'commercial' | 'land';
  transactionType: 'sale' | 'rent';
  price: number;
  surface: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  totalFloors?: number;
  yearBuilt?: number;
  address: Address;
  features?: string[];
}

// API response types
export interface PaginatedResponse {
  current: number;
  pages: number;
  total: number;
}

export interface ProspectListResponse {
  prospects: Prospect[];
  pagination: PaginatedResponse;
}

export interface PropertyListResponse {
  properties: Property[];
  pagination: PaginatedResponse;
}

export interface StatsResponse {
  stats: Array<{
    _id: string | { status?: string; type?: string; transactionType?: string };
    count: number;
    avgPrice?: number;
    totalValue?: number;
  }>;
  total: number;
}

// Form types
export interface FormError {
  field: string;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: FormError[];
}