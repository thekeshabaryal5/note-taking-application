import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="form-container">
      <div className="form-card">
        <h4 className="form-title">Log in</h4>
        <p className="error"></p>
        <form className="form-group">
          {/* username field */}
          <div>
            <label htmlFor="username">Username / Email</label>
            <input
              type="text"
              placeholder="Username or email"
              className="form-input"
              name="username"
              id="username"
              required
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

          <button type="submit" className="form-button">
            Log In
          </button>
          <p>
            Don't have an Account ? <Link to={"/register"}>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
