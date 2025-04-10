import { useEffect, useState } from "react";
import axios from "axios";

const Video = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/videos")
      .then((response) => setVideos(response.data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  return (
    <div>
      <h2>Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        videos.map((video) => (
          <div key={video._id}>
            <h3>{video.filename}</h3>
            <video width="400" controls>
              <source src={`http://localhost:5000/video/${video.filename}`} type="video/mp4" />
            </video>
          </div>
        ))
      )}
    </div>
  );
};

export default Video;
