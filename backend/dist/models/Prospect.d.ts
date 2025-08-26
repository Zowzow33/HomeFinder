import mongoose, { Document } from 'mongoose';
export interface ISearchCriteria {
    minBudget?: number;
    maxBudget?: number;
    minSurface?: number;
    maxSurface?: number;
    location?: string;
    propertyType?: 'apartment' | 'house' | 'commercial' | 'land';
    rooms?: number;
}
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
declare const _default: mongoose.Model<IProspect, {}, {}, {}, mongoose.Document<unknown, {}, IProspect, {}, {}> & IProspect & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Prospect.d.ts.map