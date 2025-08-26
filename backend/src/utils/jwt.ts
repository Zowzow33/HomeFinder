import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (user: IUser): string => {
  const payload: TokenPayload = {
    userId: String(user._id),
    email: user.email,
    role: user.role
  };

  const secret = process.env.JWT_SECRET || 'homefinder-secret-key';
  
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET || 'homefinder-secret-key';
  return jwt.verify(token, secret) as TokenPayload;
};