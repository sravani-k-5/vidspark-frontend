import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    try {
      await axios.post("https://vidspark-backend.onrender.com/signup", formData);
      toast.success("Registration successful!", { position: "top-center" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(
        (error.response && error.response.data.message) || "Server error!",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="register-container">
      <ToastContainer />
      <div className="register-form">
        <h2>VidSpark</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="user"
            placeholder="Your name"
            value={formData.user}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign up</button>
        </form>
        <p className="login-text">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
