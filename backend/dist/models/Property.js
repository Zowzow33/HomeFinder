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
// Address schema
const AddressSchema = new mongoose_1.Schema({
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
const PropertySchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model('Property', PropertySchema);
//# sourceMappingURL=Property.js.map