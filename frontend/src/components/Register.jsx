import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  return (
    <div className="form-container">
      <div className="form-card">
        <h4 className="form-title">Register</h4>
        <p className="error"></p>
        <form className="form-group">
          {/* username field */}
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="username"
              className="form-input"
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
              className="form-input"
              required
            />
          </div>
          {/* profile image field  */}
          <div>
            <label htmlFor="profile_image">Profile Image</label>
            <input
              type="file"
              name="profile_image"
              id="profile_image"
              accept="image/*"
              className="form-input"
            />
          </div>

          <button type="submit" className="form-button">
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
