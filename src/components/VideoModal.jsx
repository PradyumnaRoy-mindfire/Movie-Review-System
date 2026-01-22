const VideoModal = ({ selectedVideo, closeModal }) => {
  return (
      <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 pt-20"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl mt-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg shadow-2xl"
                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&rel=0`}
                title={selectedVideo.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <div className="mt-4 mb-16 flex justify-between">
                <div>
                    <h3 className="text-white text-xl font-bold font-capitalize">
                        {selectedVideo.name}
                    </h3>
                    <p className="text-gray-400 mt-1">{selectedVideo.type}</p>
                </div>
              <button
                onClick={closeModal}
                className="float-end font-bold rounded-md bg-white text-gray-600 shadow-md px-2 
                 hover:bg-gray-100 hover:text-gray-900
                    transition duration-200 cursor-pointer text-xl h-8 mt-3"
                aria-label="Close video"
                >
                Close 
              </button>
            </div>
          </div>
        </div>
  );
}

export default VideoModal