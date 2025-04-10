import React from "react";
import { useLocation } from "react-router-dom";

const Sharedvideos = () => {
  const location = useLocation();
  const sharedVideos = location.state?.sharedVideos || []; // Get shared videos

  return (
    <div>
      <h2>Shared Videos</h2>
      {sharedVideos.length > 0 ? (
        sharedVideos.map((video, index) => (
          <div key={index} className="video-item">
            <video controls>
              <source src={video.url} type="video/mp4" />
            </video>
            <h3>{video.vidtitle}</h3>
          </div>
        ))
      ) : (
        <p>No shared videos available</p>
      )}
    </div>
  );
};

export default Sharedvideos;
