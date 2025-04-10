import { useState } from "react";
import axios from "axios";
import "./Signuppage.css";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const validateUsername = (username) => {
    return /^[A-Z][a-zA-Z0-9]{4,12}$/.test(username); // Starts with uppercase, 5-13 chars
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,13}$/.test(password); // 6-13 chars, first letter capital, one special, contains number
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUsername(formData.username)) {
      setError("Username must start with a capital letter and be 5-13 characters long.");
      return;
    }
    if (!validatePassword(formData.password)) {
      setError("Password must start with a capital letter, include a number, a special character, and be 6-13 characters long.");
      return;
    }
    setError("");

    try {
      const response = await axios.post("http://localhost:3002/signup", formData);
      alert(response.data.message);
    } catch (err) {
      setError("Error signing up. Try again.");
    }
  };

  return (
    <>
    <Navbar/>
 
    <div className="signup-container">
      <h2 style={{backgroundColor:"green"}}>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
    </>
  );
};

export default Signup ;
