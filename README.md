
# 🎬 Movie Review System

A modern, feature-rich movie browsing application built with React that allows users to explore movies, manage favorites, and watch trailers - all powered by The Movie Database (TMDb) API.

![React](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC)

## ✨ Features

### 🏠 Home Page
- **Advanced Filtering**: Filter movies by genres and categories
- **Search Functionality**: Quick search bar to find your favorite movies
- **Infinite Scroll**: Seamless lazy loading for endless browsing
- **Movie Cards**: Display rating, genres, poster, and release date at a glance

### ⭐ Favorites Management
- **Local Storage Integration**: Persist your favorite movies across sessions
- **Drag & Drop**: Intuitive drag-and-drop interface to organize favorites
- **Watch Later Zone**: Drag movies to a dedicated watch later section
- **Toast Notifications**: Real-time feedback when adding/removing favorites

### 🎥 Movie Details Page
- **Comprehensive Stats**: Detailed information about each movie
- **External Links**: Quick access to official website and IMDb page
- **Media Gallery**: Watch trailers, teasers, and clips
- **Video Modal**: Fullscreen video player for an immersive experience

### 🎨 User Experience
- **Animations**: 
  - Fade-in effects
  - Loading animations
  - Staggered heading animations
- **Modern UI**: Clean and intuitive interface with Tailwind CSS

### ℹ️ About Page
- Information about the site
- Features explained well

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
- **Motion 12.29.0** - Animation library
- **GSAP 3.14.1** - Advanced animations
- **Lucide React 0.555.0** - Icon library
- **React Hot Toast 2.6.0** - Toast notifications
- **React Loading Indicators 1.0.1** - Loading states

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
```

## 🗂️ Project Structure

```
Movie-Review-System/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── services/        # API services
│   ├── styles/          # CSS modules
│   └── App.jsx          # Root component
├── public/              # Static assets
├── .env                 # Environment variables
├── Dockerfile           # Docker configuration
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🎯 Key Features Implementation

### Infinite Scroll
Implements lazy loading to fetch movies as users scroll, providing a seamless browsing experience without pagination.

### Drag & Drop
Uses HTML5 drag-and-drop API to allow users to organize their favorite movies and move them to the watch later section.

### Local Storage
Favorites and watch later lists are persisted in browser's local storage, ensuring data remains available across sessions.

### Custom Animations
Built with Motion and GSAP for smooth, performant animations including:
- Fade-in transitions
- Loading spinners
- Staggered text animations

## 🌐 API Integration

This project uses The Movie Database (TMDb) API v3. Key endpoints include:
- `/` - Landing page and Show movies
- `/movie/{movie_id}/details` - Movie details
- `/favourites` - Show Favourites and Watch Later
- `/about-us` - About the project 
 

