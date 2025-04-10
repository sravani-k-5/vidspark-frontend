import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import VideoList from "./VideoList";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("https://vidspark-backend.onrender.com/videos");
        const data = await response.json();

        if (selectedCategory === "all") {
          setVideos(data);
        } else {
          const filteredVideos = data.filter((video) => video.vidcategory === selectedCategory);
          setVideos(filteredVideos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [selectedCategory]); // Runs whenever selectedCategory changes

  return (
    <div className="app-container">
      <Sidebar onCategorySelect={setSelectedCategory} />
      <VideoList videos={videos} />
    </div>
  );
};

export default App;
