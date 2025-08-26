import mongoose, { Document } from 'mongoose';
export interface IAddress {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    region?: string;
}
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
declare const _default: mongoose.Model<IProperty, {}, {}, {}, mongoose.Document<unknown, {}, IProperty, {}, {}> & IProperty & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Property.d.ts.map