import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerApi } from "../const.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading
    setError(""); // Clear previous error

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("password", password);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }
    try {
      await axios.post(`${registerApi}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false); // stop loading regardless of form submission succeed or failed
    }
  };
  return (
    <div className="form-container">
      <div className="form-card">
        <h4 className="form-title">Register</h4>
        {error && (
          <p
            className="error"
            value={error}
            onChange={(e) => setError(e.target.value)}
          >
            {error}
          </p>
        )}
        <form className="form-group">
          {/* username field */}
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              id="username"
              required
            />
          </div>

          {/* email field  */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              required
            />
          </div>

          {/* contact field  */}
          <div>
            <label htmlFor="contact">Contact (optional)</label>
            <input
              type="text"
              placeholder="contact"
              name="contact"
              id="contact"
              className="form-input"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          {/* password field  */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          {/* profile image field  */}
          <div>
            <label htmlFor="profile_image">Profile Image (optional)</label>
            <input
              type="file"
              name="profile_image"
              id="profile_image"
              accept="image/*"
              className="form-input"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="form-button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Register
          </button>
          <p>
            Already Have An Account ? <Link to={"/login"}>Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
