import mongoose, { Document, Schema } from 'mongoose';

// Search criteria interface
export interface ISearchCriteria {
  minBudget?: number;
  maxBudget?: number;
  minSurface?: number;
  maxSurface?: number;
  location?: string;
  propertyType?: 'apartment' | 'house' | 'commercial' | 'land';
  rooms?: number;
}

// Prospect interface
export interface IProspect extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'meeting_scheduled' | 'viewing_done' | 'offer_made' | 'closed' | 'lost';
  searchCriteria: ISearchCriteria;
  notes?: string;
  assignedAgent: mongoose.Types.ObjectId;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
  source?: 'website' | 'referral' | 'advertising' | 'social_media' | 'other';
  createdAt: Date;
  updatedAt: Date;
}

// Search criteria schema
const SearchCriteriaSchema = new Schema({
  minBudget: {
    type: Number,
    min: [0, 'Minimum budget cannot be negative']
  },
  maxBudget: {
    type: Number,
    min: [0, 'Maximum budget cannot be negative'],
    validate: {
      validator: function(this: ISearchCriteria, value: number) {
        return !this.minBudget || value >= this.minBudget;
      },
      message: 'Maximum budget must be greater than minimum budget'
    }
  },
  minSurface: {
    type: Number,
    min: [0, 'Minimum surface cannot be negative']
  },
  maxSurface: {
    type: Number,
    min: [0, 'Maximum surface cannot be negative'],
    validate: {
      validator: function(this: ISearchCriteria, value: number) {
        return !this.minSurface || value >= this.minSurface;
      },
      message: 'Maximum surface must be greater than minimum surface'
    }
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'commercial', 'land']
  },
  rooms: {
    type: Number,
    min: [1, 'Number of rooms must be at least 1'],
    max: [20, 'Number of rooms cannot exceed 20']
  }
}, { _id: false });

// Prospect schema
const ProspectSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'meeting_scheduled', 'viewing_done', 'offer_made', 'closed', 'lost'],
    default: 'new'
  },
  searchCriteria: {
    type: SearchCriteriaSchema,
    required: [true, 'Search criteria is required']
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  assignedAgent: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Assigned agent is required']
  },
  lastContactDate: {
    type: Date
  },
  nextFollowUpDate: {
    type: Date
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'advertising', 'social_media', 'other'],
    default: 'website'
  }
}, {
  timestamps: true
});

// Indexes
ProspectSchema.index({ assignedAgent: 1, status: 1 });
ProspectSchema.index({ email: 1 });
ProspectSchema.index({ nextFollowUpDate: 1 });

export default mongoose.model<IProspect>('Prospect', ProspectSchema);