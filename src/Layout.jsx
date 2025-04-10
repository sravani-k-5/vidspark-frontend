import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import MainPage from "./components/Earth"; // Navbar

const Layout = () => {
  return (
    <div className="app-container">
      {/* Navbar */}
      <MainPage />

      {/* Sidebar + Main Content */}
      <div className="content-container">
        <Sidebar />
        <div className="main-content">
          <Outlet /> {/* This is where the child routes will be rendered */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
