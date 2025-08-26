import { IUser } from '../models/User';
export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}
export declare const generateToken: (user: IUser) => string;
export declare const verifyToken: (token: string) => TokenPayload;
//# sourceMappingURL=jwt.d.ts.map