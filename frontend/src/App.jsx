import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import "./App.css";
import UserVerify from "./components/UserVerify";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
const App = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading.......</div>;
  }
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        ></Route>
        <Route path="/verify-email" element={<UserVerify></UserVerify>}></Route>
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        ></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard></Dashboard>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
