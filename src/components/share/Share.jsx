import { useState, useEffect } from "react";
const SharedVideos = () => {
  const [sharedVideos, setSharedVideos] = useState([]);
  const fetchSharedVideos = async () => {
    const token = localStorage.getItem("token");
  console.log(token)
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3002/api/sharedVideos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch liked videos");
      }
  
      const data = await response.json();
      setSharedVideos(data.sharedVideos);
    } catch (error) {
      console.error("Error fetching liked videos:", error);
    }
  };
  
  useEffect(() => {
    fetchSharedVideos();
  }, []);

  return (
    <div className="video-section">
      <h2>Shared Videos</h2>
      {sharedVideos.length > 0 ? (
        sharedVideos.map((video) => (
          <div key={video._id} className="video-item">
            <video controls>
              <source src={video.url} type="video/mp4" />
            </video>
            <h3>{video.vidtitle}</h3>
          </div>
        ))
      ) : (
        <p>No liked videos available</p>
      )}
    </div>
  );
};

export default SharedVideos;
