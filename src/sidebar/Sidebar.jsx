import { useState } from "react";
import { FaFire, FaShoppingBag, FaMusic, FaFilm, FaGamepad, FaNewspaper, FaTrophy, FaGraduationCap, FaTshirt, FaPodcast, FaHome, FaThumbsUp, FaShare, FaSave } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import "./Sidebar.css";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Popular</h2>
      <Link to="/" className="sidebar-item">
        <FaHome size={24} />
        <span>Home</span>
      </Link>

      <h2 className="sidebar-title">Categories</h2>
      {[
        { key: "trending", icon: <FaFire />, label: "Trending" },
        { key: "music", icon: <FaMusic />, label: "Music" },
        { key: "movies", icon: <FaFilm />, label: "Movies" },
        { key: "news", icon: <FaNewspaper />, label: "News" },
        { key: "gaming", icon: <FaGamepad />, label: "Gaming" },
        { key: "sports", icon: <FaTrophy />, label: "Sports" },
        { key: "education", icon: <FaGraduationCap />, label: "Education" },
        { key: "fashion", icon: <FaTshirt />, label: "Fashion" },
        { key: "shopping", icon: <FaShoppingBag />, label: "Shopping" },
        { key: "podcasts", icon: <FaPodcast />, label: "Podcasts" },
      ].map(({ key, icon, label }) => (
        <Link key={key} to={`/${key}`} className="sidebar-item">
          {icon}
          <span>{label}</span>
        </Link>
      ))}




      <h2 className="sidebar-title">Actions</h2>
      <Link to="/liked-videos" className="sidebar-item">
        <FaThumbsUp size={24} />
        <span>Liked Videos</span>
      </Link>

      
        <Link to="/shared-videos" className="sidebar-item">
        <FaShare size={24}/>
        <span>Shared Videos</span>
        </Link>
      
      
    </div>
  );
};

export default Sidebar;
















// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; 
// import {FaFire,FaShoppingBag,FaMusic,FaFilm,FaGamepad,FaNewspaper,FaTrophy,FaGraduationCap,FaTshirt,FaPodcast,FaHome,FaThumbsUp,FaShare,FaSave,FaComment,} from "react-icons/fa";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const [videos, setVideos] = useState([]);
//   const [filteredVideos, setFilteredVideos] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setloading] = useState(false);
//   const [sharedVideos, setSharedVideos] = useState([]);
//   const [showSharedVideos, setShowSharedVideos] = useState(false);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const response = await fetch("http://localhost:3002/videos");
//         const data = await response.json();
//         // console.log(data)
//         setVideos(data);
//         setFilteredVideos(data);
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//       }
//     };
//     fetchVideos();
//   }, []);


//   const shareVideo = async (video) => {
//     try {
//       const response = await fetch("http://localhost:3002/api/shareVideo", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ videoId: video.id }),
//       });

//       const data = await response.json();
//       alert(data.message);
//       setSharedVideos((prevShared) => [...prevShared, video]);
//     } catch (error) {
//       console.error("Error sharing video:", error);
//     }
//   };


//   const filterVideos = (category) => {
//     setSelectedCategory(category);
//     setSelectedVideo(null);

//     setloading(true);

//     if (category === "all") {
//       setFilteredVideos(videos);
//     } else {
//       const filtered = videos.filter((video) => video.vidcategory === category);
//       setFilteredVideos(filtered);
//     }

//     setTimeout(() => setloading(false), 500);
//   };

//   return (
//     <div className="container">
//       <div className="sidebar">
//         <h2 className="sidebar-title">Popular</h2>
//         <div
//           className={`sidebar-item ${selectedCategory === "all" ? "active" : ""}`}
//           onClick={() => filterVideos("all")}
//         >
//           <FaHome size={24} />
//           <span>Home</span>
//         </div>

//         <h2 className="sidebar-title">Categories</h2>
//         <div className={`sidebar-item ${selectedCategory === "trending" ? "active" : ""}`} onClick={() => filterVideos("trending")}>
//           <FaFire size={24} />
//           <span>Trending</span>
//         </div>
//         <div className={`sidebar-item ${selectedCategory === "music" ? "active" : ""}`} onClick={() => filterVideos("music")}>
//           <FaMusic size={24} />
//           <span>Music</span>
//         </div>
//         <div className={`sidebar-item ${selectedCategory === "movies" ? "active" : ""}`} onClick={() => filterVideos("movies")}>
//           <FaFilm size={24} />
//           <span>Movies</span>
//         </div>
//         <div className={`sidebar-item ${selectedCategory === "news" ? "active" : ""}`} onClick={() => filterVideos("news")}>
//           <FaNewspaper size={24} />
//           <span>News</span>
//         </div>
//         <div className={`sidebar-item ${selectedCategory === "gaming" ? "active" : ""}`} onClick={() => filterVideos("gaming")}>
//           <FaGamepad size={24} />
//           <span>Gaming</span>
//         </div>
//         <div className={`sidebar-item ${selectedCategory === "sports" ? "active" : ""}`} onClick={() => filterVideos("sports")}>
//           <FaTrophy size={24} />
//           <span>Sports</span>
//         </div>
//         <div className={`sidebar-item ${selectedCategory === "education" ? "active" : ""}`} onClick={() => filterVideos("education")}>
//           <FaGraduationCap size={24} />
//           <span>Education</span>
//         </div>
//         <div className={`sidebar-item ${selectedCategory === "fashion" ? "active" : ""}`} onClick={() => filterVideos("fashion")}>
//           <FaTshirt size={24} />
//           <span>Fashion</span>
//         </div>
//         <div className={`sidebar-item ${selectedCategory === "shopping" ? "active" : ""}`} onClick={() => filterVideos("shopping")}>
//           <FaShoppingBag size={24} />
//           <span>Shopping</span>
//         </div>
//         <div className={`sidebar-item ${selectedCategory === "podcasts" ? "active" : ""}`} onClick={() => filterVideos("podcasts")}>
//           <FaPodcast size={24} />
//           <span>Podcasts</span>
//         </div>



//         <h2 className="sidebar-title">Actions</h2>
//         <div className={`sidebar-item ${selectedCategory === "liked" ? "active" : ""}`} onClick={() => filterVideos("liked")}>
//           <FaThumbsUp size={24} />
//           <span>Liked Videos</span>
//         </div>
//         <div className="sidebar-item" >
//           <FaShare size={24} />
//           <span>Shared Videos</span>
//         </div>

//         <div className="sidebar-item">
//           <FaSave size={24} />
//           <span>Saved Videos</span>
//         </div>
//       </div>

//       <div className="content">
//         {loading ? (
//           <h1>Loading...</h1>
//         ) : showSharedVideos ? (
//           <div className="video-section">
//             <h2>Shared Videos</h2>
//             {sharedVideos.length > 0 ? (
//               sharedVideos.map((video, index) => (
//                 <div
//                   key={index}
//                   className="video-item"
//                   onMouseEnter={(e) => e.currentTarget.querySelector("video").play()}
//                   onMouseLeave={(e) => e.currentTarget.querySelector("video").pause()}
//                   onClick={() => setSelectedVideo(video)}
//                 >
//                   <video muted>
//                     <source src={video.url} type="video/mp4" />
//                   </video>
//                   <h3>{video.vidtitle}</h3>
//                 </div>
//               ))
//             ) : (
//               <p>No shared videos available</p>
//             )}
//           </div>
//         ) : selectedVideo ? (
//           <div className="video-player">
//             <video controls autoPlay>
//               <source src={selectedVideo.url} type="video/mp4" />
//             </video>
//             <div className="fullinfo">
//               <h3>{selectedVideo.vidtitle}</h3>
//               <p>{selectedVideo.viddescription}</p>
//               <div className="video-actions">
//                 <button onClick={() => toggleLike(selectedVideo)}>
//                   <FaThumbsUp />
//                   {likedVideos.some((v) => v.id === selectedVideo.id) ? "Unlike" : "Like"}
//                 </button>
//                 <button>
//                   <FaComment /> Comment
//                 </button>
//                 <button onClick={() => shareVideo(selectedVideo)}>
//                   <FaShare /> Share
//                 </button>
//                 <button>
//                   <FaSave /> Save
//                 </button>
//               </div>
//             </div>
//             <button className="back-button" onClick={() => setSelectedVideo(null)}>
//               Back
//             </button>
//           </div>
//         ) : (
//           <div className="video-section">
//             {filteredVideos.length > 0 ? (
//               filteredVideos.map((video, index) => (
//                 <div
//                   key={index}
//                   className="video-item"
//                   onMouseEnter={(e) => e.currentTarget.querySelector("video").play()}
//                   onMouseLeave={(e) => e.currentTarget.querySelector("video").pause()}
//                   onClick={() => setSelectedVideo(video)}
//                 >
//                   <video muted>
//                     <source src={video.url} type="video/mp4" />
//                   </video>
//                   <h3>{video.vidtitle}</h3>
//                 </div>
//               ))
//             ) : (
//               <p>No videos available</p>
//             )}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default Sidebar;




