import mongoose, { Document, Schema } from 'mongoose';

// Address interface
export interface IAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  region?: string;
}

// Property interface
export interface IProperty extends Document {
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
  address: IAddress;
  features?: string[];
  images?: string[];
  assignedAgent: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Address schema
const AddressSchema = new Schema({
  street: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true,
    maxlength: [200, 'Street address cannot exceed 200 characters']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [100, 'City cannot exceed 100 characters']
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required'],
    trim: true,
    maxlength: [20, 'Postal code cannot exceed 20 characters']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxlength: [100, 'Country cannot exceed 100 characters']
  },
  region: {
    type: String,
    trim: true,
    maxlength: [100, 'Region cannot exceed 100 characters']
  }
}, { _id: false });

// Property schema
const PropertySchema = new Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  type: {
    type: String,
    enum: ['apartment', 'house', 'commercial', 'land'],
    required: [true, 'Property type is required']
  },
  status: {
    type: String,
    enum: ['available', 'under_offer', 'sold', 'rented', 'off_market'],
    default: 'available'
  },
  transactionType: {
    type: String,
    enum: ['sale', 'rent'],
    required: [true, 'Transaction type is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  surface: {
    type: Number,
    required: [true, 'Surface area is required'],
    min: [1, 'Surface area must be at least 1 square meter']
  },
  rooms: {
    type: Number,
    min: [1, 'Number of rooms must be at least 1'],
    max: [50, 'Number of rooms cannot exceed 50']
  },
  bedrooms: {
    type: Number,
    min: [0, 'Number of bedrooms cannot be negative'],
    max: [20, 'Number of bedrooms cannot exceed 20']
  },
  bathrooms: {
    type: Number,
    min: [0, 'Number of bathrooms cannot be negative'],
    max: [10, 'Number of bathrooms cannot exceed 10']
  },
  floor: {
    type: Number,
    min: [-5, 'Floor cannot be below -5'],
    max: [200, 'Floor cannot exceed 200']
  },
  totalFloors: {
    type: Number,
    min: [1, 'Total floors must be at least 1'],
    max: [200, 'Total floors cannot exceed 200']
  },
  yearBuilt: {
    type: Number,
    min: [1800, 'Year built cannot be before 1800'],
    max: [new Date().getFullYear() + 5, 'Year built cannot be more than 5 years in the future']
  },
  address: {
    type: AddressSchema,
    required: [true, 'Address is required']
  },
  features: [{
    type: String,
    trim: true,
    maxlength: [100, 'Feature cannot exceed 100 characters']
  }],
  images: [{
    type: String,
    trim: true
  }],
  assignedAgent: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Assigned agent is required']
  }
}, {
  timestamps: true
});

// Indexes
PropertySchema.index({ assignedAgent: 1, status: 1 });
PropertySchema.index({ type: 1, transactionType: 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ surface: 1 });
PropertySchema.index({ 'address.city': 1 });

export default mongoose.model<IProperty>('Property', PropertySchema);