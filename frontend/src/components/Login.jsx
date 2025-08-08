import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login, loading } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Trying to login....");
      const success = await login({ username, password });
      console.log("login....");
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Login Failed: Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h4 className="form-title">Log in</h4>
        {error && <p className="error">{error}</p>}
        <form className="form-group" onSubmit={handleSubmit}>
          {/* username field */}
          <div>
            <label htmlFor="username">Username / Email</label>
            <input
              type="text"
              placeholder="Username or email"
              className="form-input"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* password field */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              id="password"
              className="form-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
