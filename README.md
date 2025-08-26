# HomeFinder - SaaS Platform for Real Estate Agents

HomeFinder is a comprehensive SaaS platform designed for real estate agents to centralize the management of prospects, properties, and real estate searches. This all-in-one application helps independent agents and small agencies gain efficiency.

## Architecture

- **Frontend**: React.js with TypeScript (Vite)
- **Backend**: Node.js with Express and TypeScript
- **Database**: MongoDB for flexible schemas
- **Authentication**: JWT with role system
- **API**: RESTful for front/back communication
- **Deployment**: Docker containerization

## Core Features (MVP)

1. **Authentication and User Management**
   - User registration and login for agents
   - User profiles and settings

2. **Prospect Management (Mini-CRM)**
   - Add, edit, and delete prospects
   - Store search criteria (budget, surface area, location)
   - Associate prospects with properties

3. **Property Management**
   - Property listings with essential information
   - Detailed property sheets
   - Multi-step property creation process

4. **Dashboard**
   - Overview of key indicators
   - Recent activities
   - Pending tasks

## Project Structure

```
HomeFinder/
├── backend/                 # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Authentication & validation
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml      # Docker orchestration
├── Dockerfile.backend      # Backend container
├── Dockerfile.frontend     # Frontend container
└── nginx.conf             # Nginx configuration
```

## Getting Started

### Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HomeFinder
   ```

2. **Start with Docker Compose** (Recommended)
   ```bash
   docker-compose up -d
   ```
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

3. **Or run locally**

   **Backend:**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new agent
- `POST /api/auth/login` - Agent login
- `GET /api/auth/profile` - Get user profile

#### Prospects
- `GET /api/prospects` - List prospects
- `POST /api/prospects` - Create prospect
- `GET /api/prospects/:id` - Get prospect details
- `PUT /api/prospects/:id` - Update prospect
- `DELETE /api/prospects/:id` - Delete prospect
- `GET /api/prospects/stats` - Get prospect statistics

#### Properties
- `GET /api/properties` - List properties
- `POST /api/properties` - Create property
- `GET /api/properties/:id` - Get property details
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/stats` - Get property statistics

## Data Models

### User
- firstName, lastName, email, password
- role (agent/admin)
- agency, phone
- timestamps

### Prospect
- firstName, lastName, email, phone
- status (new, contacted, meeting_scheduled, etc.)
- searchCriteria (budget, surface, location, type)
- notes, assignedAgent
- lastContactDate, nextFollowUpDate
- source, timestamps

### Property
- title, description, type, status
- transactionType (sale/rent)
- price, surface, rooms, bedrooms, bathrooms
- address (street, city, postalCode, country)
- features, images, assignedAgent
- timestamps

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/homefinder
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:3000
```

## License

MIT