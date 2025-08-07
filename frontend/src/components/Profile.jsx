import React from "react";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h4 className="profile-title">Profile</h4>
        <div className="profile-info">
          <p>
            <strong>Username: </strong> Keshab Aryal
          </p>
          <p>
            <strong>Email: </strong> kesab@gmail.com
          </p>
          <p>
            <strong>Contact: </strong>10253466582
          </p>
          <img
            src="https://placehold.co/600x400"
            alt="profile-image"
            className="profile-image "
          />
          <input type="file" accept="image/*" className="form-input" required />
          <button class="form-button">Update Profile Image</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
