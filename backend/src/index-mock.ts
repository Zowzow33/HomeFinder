import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Mock auth routes for testing (without database)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }
  
  // Mock successful login
  res.json({
    message: 'Login successful',
    token: 'mock-jwt-token-for-testing',
    user: {
      id: 'mock-user-id',
      email: email,
      createdAt: new Date().toISOString()
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }
  
  // Mock successful registration
  res.status(201).json({
    message: 'User created successfully',
    token: 'mock-jwt-token-for-testing',
    user: {
      id: 'mock-user-id',
      email: email,
      createdAt: new Date().toISOString()
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HomeFinder API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});