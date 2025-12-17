# Movie API Backend

Production-grade backend application for Movie Search & Favourites project using Node.js, Express, and TypeScript.
Built with Inversify for Dependency Injection and following Clean Architecture principles.

## Features

- **Architecture**: Module-based (NestJS-like), Clean Architecture, Repository Pattern
- **Language**: TypeScript (Strict mode)
- **Framework**: Express with Inversify DI
- **Authentication**: JWT-based (Register, Login, Me)
- **Movie Data**: OMDB API integration
- **Storage**: In-memory storage (Data resets on restart)

## Prerequisites

- Node.js (v14+)
- npm or yarn

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```
   *Note: You must obtain a free API key from [OMDB API](https://www.omdbapi.com/apikey.aspx) and set it as `OMDB_API_KEY`.*

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
backend/
└── src/
    ├── modules/          # Feature modules (Auth, User, Movie)
    │   └── [module]/
    │       ├── controller/
    │       ├── services/
    │       ├── repositories/
    │       ├── routes/
    │       ├── dtos/
    │       └── interfaces/
    ├── shared/           # Shared utilities, types, constants
    ├── di/               # Dependency Injection container
    ├── config/           # Environment configuration
    ├── socket/           # Socket.io setup
    ├── app.ts           # Express app setup
    ├── bootstrap.ts     # Server startup logic
    └── main.ts          # Entry point
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user profile (Protected)

### User
- `GET /api/user/profile` - Get user profile (Protected)

### Movies
- `GET /api/movies/search?query=batman&page=1` - Search movies
- `POST /api/movies/favorites` - Add to favourites (Protected)
- `GET /api/movies/favorites` - Get favourites (Protected)
- `DELETE /api/movies/favorites/:movieId` - Remove from favourites (Protected)
