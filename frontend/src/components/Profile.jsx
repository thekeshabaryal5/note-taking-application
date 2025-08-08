import React, { useEffect, useState } from "react";
import axios from "axios";
import { profileApi, serverUrl, updateProfileImageApi } from "../const";

const Profile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(profileApi, { withCredentials: true });
      setUser(response.data.result);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch user data");
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("profile_image", profileImage);
    try {
      const response = await axios.patch(`${updateProfileImageApi}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setUser({ ...user, profile_image: response.data.profile_image });
      setProfileImage(null);
    } catch (err) {
      console.log(error);
      setError("Failed to upload image");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [profileImage]);

  if (!user && !error) {
    return <div>Loading.....</div>;
  }
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h4 className="profile-title">Profile</h4>
        {error && <p className="error">{error}</p>}
        {user && (
          <div className="profile-info">
            <p>
              <strong>Username: </strong> {user.username}
            </p>
            <p>
              <strong>Email: </strong> {user.email}
            </p>
            <p>
              <strong>Contact: </strong> {user.contact || "N/A"}
            </p>
            {user.profile_image && (
              <img
                src={`${user.profile_image}`}
                alt="profile"
                className="profile-image"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="form-input"
              onChange={(e) => {
                setProfileImage(e.target.files[0]);
              }}
            />
            {profileImage && (
              <button onClick={handleImageUpload} className="form-button">
                Update Profile Image
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
