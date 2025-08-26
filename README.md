# HomeFinder

A modern real estate CRM platform for agents, built with React, TypeScript, Node.js, and PostgreSQL.

## Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Modern UI**: Clean, responsive design with orange color scheme (#FF5722)
- **TypeScript**: Full TypeScript support for both frontend and backend
- **Database**: PostgreSQL with Prisma ORM
- **Security**: CORS configuration, security headers, and input validation
- **Docker**: Ready for containerized deployment

## Project Structure

```
homefinder/
├── frontend/          # React TypeScript app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   └── tsconfig.json
├── backend/           # Node.js API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── middleware/
│   ├── prisma/
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (or use Docker)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd homefinder
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database configuration
   ```

3. **Set up the database**
   ```bash
   # If using Docker
   docker-compose up postgres -d
   
   # Run Prisma migrations
   npm run db:migrate
   npm run db:generate
   ```

4. **Start the backend**
   ```bash
   npm run dev
   ```

5. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the frontend**
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Using Docker

1. **Start all services**
   ```bash
   docker-compose up
   ```

2. **For development with hot reload**
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

## Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/homefinder"
JWT_SECRET="your-super-secure-jwt-secret-key-here"
JWT_EXPIRES_IN="7d"
PORT=5000
FRONTEND_URL="http://localhost:3000"
BCRYPT_ROUNDS=12
```

### Frontend

```env
REACT_APP_API_URL="http://localhost:5000"
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/health` - Health check

## Development

### Backend

```bash
cd backend
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

### Frontend

```bash
cd frontend
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run tests
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id          TEXT PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Input validation
- SQL injection protection with Prisma

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the ISC License.