"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Search criteria schema
const SearchCriteriaSchema = new mongoose_1.Schema({
    minBudget: {
        type: Number,
        min: [0, 'Minimum budget cannot be negative']
    },
    maxBudget: {
        type: Number,
        min: [0, 'Maximum budget cannot be negative'],
        validate: {
            validator: function (value) {
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
            validator: function (value) {
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
const ProspectSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model('Prospect', ProspectSchema);
//# sourceMappingURL=Prospect.js.map