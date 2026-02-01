import { useState, useEffect } from "react";
import useFetchMovieVideos from "../../services/fetchMovieVideosFromApiService";
import LoadingEffect from "../animation/LoadingEffect";
import VideoModal from "./VideoModal";
import FadeInAnimation from "../animation/FadeInAnimation";

const MovieVideos = ({ id }) => {
  const { videos, isLoading } = useFetchMovieVideos(id);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  // Video type priority and display names
  const videoTypeMap = {
    0: { name: "Teaser", priority: 1 },
    1: { name: "Featurette", priority: 4 },
    2: { name: "Trailer", priority: 2 },
    3: { name: "Clip", priority: 5 },
    4: { name: "Behind the Scenes", priority: 3 },
  };

  const categorizeVideos = () => {
    if (!videos || videos.length === 0) return {};

    const categorized = {};

    videos.forEach((video) => {
      const videoName = video.name?.toLowerCase() || "";
      let category = null;

      // Check for each type case-insensitive,show accordingly
      if (videoName.includes("teaser")) {
        category = "Teaser";
      } else if (videoName.includes("trailer")) {
        category = "Trailer";
      } else if (videoName.includes("featurette")) {
        category = "Featurette";
      } else if (videoName.includes("clip")) {
        category = "Clip";
      } else if (videoName.includes("behind the scene")) {
        category = "Behind the Scenes";
      } else {
        category = "Other";
      }

      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(video);
    });

    return categorized;
  };

  const categorizedVideos = categorizeVideos();

  // Sort categoryies by priority
  const sortedCategories = Object.keys(categorizedVideos).sort((a, b) => {
    const priorityA =
      Object.values(videoTypeMap).find((v) => v.name === a)?.priority || 999;
    const priorityB =
      Object.values(videoTypeMap).find((v) => v.name === b)?.priority || 999;
    return priorityA - priorityB;
  });

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleImageError = (videoId) => {
    setImageErrors((prev) => ({ ...prev, [videoId]: true }));
  };

  // Prevent body scroll when modal is open,
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedVideo]);

  if (isLoading) {
    return <LoadingEffect />;
  }

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-8">
      {sortedCategories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categorizedVideos[category].map((video) => (
              <FadeInAnimation key={video.key} type={"movieVideos"}>
                <div
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className="group cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                    {!imageErrors[video.id] ? (
                      <img
                        src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                        alt={video.name}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(video.id)}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full bg-gray-800 flex items-center justify-center"
                        aria-label="Video thumbnail not available"
                      >
                        <svg
                          className="w-16 h-16 text-white drop-shadow-lg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white drop-shadow-lg "
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-white font-semibold text-sm line-clamp-2">
                      {video.name}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">{video.type}</p>
                  </div>
                </div>
              </FadeInAnimation>
            ))}
          </div>
        </div>
      ))}

      {/* Show Video Modal */}
      {selectedVideo && (
        <VideoModal
          selectedVideo={selectedVideo}
          closeModal={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default MovieVideos;
