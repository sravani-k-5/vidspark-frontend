
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import VideoContent from "./sidebar/VideoContent";
import LikedVideos from "./components/likes/LikedVideo";
import SharedVideos from "./components/share/Share";
import Loginpage from "./Auth/Loginpage";
import Register from "./Auth/Register";
import Trending from "./pages/Trending";
import Music from "./pages/Music";
import Movies from "./pages/Movies";
import News from "./pages/News";
import Gaming from "./pages/Gaming";
import Sports from "./pages/Sports";
import Education from "./pages/Education";
import Fashion from "./pages/Fashion";
import Shopping from "./pages/Shopping";
import Podcasts from "./pages/Podcasts";
import Myprofile from "./Auth/Myprofile";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<VideoContent />} />
          <Route path="trending" element={<Trending />} />
          <Route path="music" element={<Music />} />
          <Route path="movies" element={<Movies />} />
          <Route path="news" element={<News />} />
          <Route path="gaming" element={<Gaming />} />
          <Route path="sports" element={<Sports />} />
          <Route path="education" element={<Education />} />
          <Route path="fashion" element={<Fashion />} />
          <Route path="shopping" element={<Shopping />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="liked-videos" element={<LikedVideos />} />
          <Route path="shared-videos" element={<SharedVideos />} />
          <Route path="/myprofile" element={<Myprofile />} />
        </Route>

        {/* Separate Routes (Outside Layout) */}
        <Route path="/login" element={<Loginpage />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
