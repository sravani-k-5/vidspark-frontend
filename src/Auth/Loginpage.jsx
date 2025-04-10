
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Loginpage.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://vidspark-backend.onrender.com/api/login", formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error("Token not received!", { position: "top-center" });
        return;
      }

      toast.success("Login successful!", { position: "top-center" });

      if (response.data.user) {
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("userName", response.data.user.name);
      } else {
        toast.error("User data not found!", { position: "top-center" });
        return;
      }

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, { position: "top-center" });
      } else {
        toast.error("Server error! Try again later.", { position: "top-center" });
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <ToastContainer />
        <div className="login-form">
          <h2>Vidspark</h2>
          <div className="sub-header">
            <span>Sign In</span>
            <a href="/Register">or Sign Up</a>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input type="submit" value="Login" />
          </form>
          <div className="footer-note">Your info is safe. We never spam.</div>
        </div>
      </div>
    </>
  );
};

export default Login;
