import { useState, useEffect } from "react";
import "./LikedVideo.css";

const LikedVideos = () => {
    const [likedVideos, setLikedVideos] = useState([]);

    const fetchLikedVideos = async () => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
            alert("User not authenticated. Please log in.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3002/api/likedVideos", {
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
              console.log("Liked Videos:", data);

            setLikedVideos(data.likedVideos);
        } catch (error) {
            console.error("Error fetching liked videos:", error);
        }
    };
    const handleDelete = async (videoId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3002/api/likedVideos/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete liked video");
      }

      // Remove the deleted video from local state
      setLikedVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
    } catch (error) {
      console.error("Error deleting liked video:", error);
    }
  };

    useEffect(() => {

        fetchLikedVideos();
    }, []);

    return (
               
        <div className="video-section">
            {/* <h2>Liked Videos</h2> */}
            {likedVideos.length > 0 ? (
                likedVideos.map((video) => (
                    <div key={video._id} className="video-item">
                        <video controls>
                            <source src={video.url} type="video/mp4" />
                        </video>

                        <h3>{video.vidtitle}</h3>
                        <button className="delete-btn" onClick={() => handleDelete(video._id)}>
                Delete
              </button>
                    </div>
                ))
            ) : (
                <p>No liked videos available</p>
            )}
        </div>

    );
};

export default LikedVideos;
