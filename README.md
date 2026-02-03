# 🎬 Movie Review System

A modern, feature-rich movie browsing application built with React that allows users to explore movies, manage favorites, and watch trailers - all powered by The Movie Database (TMDb) API.

![React](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC)

## ✨ Features

### 🏠 Home Page

- **Advanced Filtering**: Filter movies by genres and categories (Popular, Top Rated, Latest)
- **Search Functionality**: Debounced search bar to find your favorite movies
- **Infinite Scroll**: Seamless lazy loading with React Query for endless browsing
- **Movie Cards**: Memoized cards displaying rating, genres, poster, and release date

### ⭐ Favorites Management

- **Local Storage Integration**: Persist your favorite movies across sessions
- **Drag & Drop**: Intuitive drag-and-drop interface to organize favorites
- **Watch Later Zone**: Drag movies to a dedicated watch later section
- **Toast Notifications**: Real-time feedback when adding/removing favorites

### 🎥 Movie Details Page

- **Comprehensive Stats**: Detailed information including budget, revenue, runtime
- **External Links**: Quick access to official website and IMDb page
- **Media Gallery**: Watch trailers, teasers, and clips
- **Video Modal**: Fullscreen video player for an immersive experience

### 🎨 User Experience

- **Animations**:
  - Fade-in effects
  - Loading animations
  - Staggered heading animations
  - Circular text animation
- **Modern UI**: Clean and intuitive interface with Tailwind CSS
- **Scroll to Top**: Smart button that switches between back navigation and scroll-to-top

### ℹ️ About Page

- Information about the site and team
- Feature highlights with icons
- Statistics section

### 🚫 404 Page

- Animated parallax effect
- Quick navigation back to home
- Modern glassmorphism design

### ⚡ Performance Optimizations

- **Code Splitting**: React.lazy for route-based lazy loading
- **Memoization**: React.memo on key components (MovieCard, Navbar, etc.)
- **Optimized Hooks**: useMemo and useCallback for expensive operations
- **Efficient Data Fetching**: TanStack Query with caching and infinite queries

### 🧪 Testing & Code Quality

- **Unit Tests**: 56+ tests with Vitest and Testing Library
- **Linting**: ESLint with React hooks rules
- **Formatting**: Prettier with consistent code style
- **Pre-commit Hooks**: Husky + lint-staged for automated checks

### 🚀 Deployment

This project is deployed on Vercel and can be accessed at:
🔗 [Live Demo](https://cineflix-swart.vercel.app/)

## 🛠️ Tech Stack

### Core Technologies

- **React 19.1.0** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM 6.30.2** - Client-side routing
- **Docker** - Containerization

### Styling

- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Modular CSS** - Component-scoped styling

### Libraries & Dependencies

- **TanStack Query 5.90.20** - Data fetching and caching
- **Motion 12.29.0** - Animation library
- **GSAP 3.14.1** - Advanced animations
- **Lucide React 0.555.0** - Icon library
- **React Hot Toast 2.6.0** - Toast notifications
- **React Loading Indicators 1.0.1** - Loading states

### Development Tools

- **Vitest** - Unit testing framework
- **Testing Library** - React component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

### Deployment

- **Platform**: Vercel
- **Container**: Docker
- **Web Server**: Nginx
- **Build**: Multi-stage Docker build

### API

- **The Movie Database (TMDb) API** - Movie data source

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm
- TMDb API Key ([Get it here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**

```bash
git clone <https://github.com/PradyumnaRoy-mindfire/Movie-Review-System.git>
cd Movie-Review-System
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_MOVIE_API_KEY=YOUR_API_KEY
VITE_MOVIE_BASE_URL='https://api.themoviedb.org/3'
VITE_MOVIE_API_URL='YOUR_POPULAR_MOVIE_API_URL'
VITE_GENRE_URL='YOUR_GENRE_API_URL'
VITE_YOUTUBE_VIDEOS_URL='https://www.youtube.com/watch?v='
VITE_IMAGE_BASE_URL='https://image.tmdb.org/t/p/'
VITE_IMDB_BASE_URL='https://www.imdb.com/title/'
VITE_PLACEHOLDER_IMAGE_URL='YOUR_PLACEHOLDER_IMAGE_URL'
```

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Docker Setup

1. **Build the Docker image**

```bash
docker build -t movie-review-system .
```

2. **Run the container**

```bash
docker run -p 5173:5173 movie-review-system
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage report
```

## 🗂️ Project Structure

```
Movie-Review-System/
├── src/
│   ├── __tests__/       # Test files
│   │   ├── components/  # Component tests
│   │   ├── hooks/       # Hook tests
│   │   ├── constants/   # Constant tests
│   │   └── utils/       # Test utilities
│   ├── components/      # Reusable components
│   │   ├── animation/   # Animation components
│   │   ├── addToFavourite/  # Favourite components
│   │   ├── searchAndFilteration/  # Filter components
│   │   └── seeMovieDetails/  # Movie detail components
│   ├── constants/       # Route constants
│   ├── css/             # CSS modules
│   ├── customHooks/     # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   └── App.jsx          # Root component
├── public/              # Static assets
├── .husky/              # Git hooks
├── .env                 # Environment variables
├── .prettierrc          # Prettier configuration
├── eslint.config.js     # ESLint configuration
├── vitest.config.js     # Vitest configuration
├── Dockerfile           # Docker configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🎯 Key Features Implementation

### Code Splitting & Lazy Loading

All page components are lazy-loaded using React.lazy and Suspense, reducing initial bundle size and improving load times.

### Infinite Scroll

Implements TanStack Query's useInfiniteQuery to fetch movies as users scroll, providing a seamless browsing experience without pagination.

### Memoization

Key components like MovieCard, Navbar, and CategoryFilter are wrapped with React.memo to prevent unnecessary re-renders.

### Drag & Drop

Uses HTML5 drag-and-drop API to allow users to organize their favorite movies and move them to the watch later section.

### Local Storage

Favorites and watch later lists are persisted in browser's local storage, ensuring data remains available across sessions.

### Custom Animations

Built with Motion and GSAP for smooth, performant animations including:

- Fade-in transitions
- Loading spinners
- Staggered text animations
- Circular rotating text

### Testing

Comprehensive test suite with Vitest covering:

- Custom hooks (useFavourite)
- UI components (Navbar, SearchBar, CategoryFilter)
- Constants validation (routes)

## 🌐 API Integration

This project uses The Movie Database (TMDb) API v3. Key endpoints include:

- `/` - Landing page and Show movies
- `/movie/{movie_id}/details` - Movie details
- `/favourites` - Show Favourites and Watch Later
- `/about-us` - About the project
