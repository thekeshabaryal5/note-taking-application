import React, { useState } from "react";
import { getNotesApi } from "../const";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${getNotesApi}`, {
        withCredentials: true,
      });
      setNotes(response.result);
    } catch (error) {
      setError("Failed to fetch notes " + err);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">My Notes</h2>
        <input
          type="text"
          name="search"
          placeholder="search notes"
          className="notes-search"
        />
      </div>

      <p className="error"></p>
      <div className="note-input-container">
        <input
          type="text"
          name="title"
          className="create-note-title"
          placeholder="note title"
        />
        <textarea
          className="note-textarea"
          name="note"
          placeholder="your notes goes here"
        ></textarea>
        <div className="note-footer">
          <p>Select Category</p>
          <div className="note-category">
            <label>
              <input type="checkbox" name="category" value="1" />
              Work
            </label>
            <label>
              <input type="checkbox" name="category" value="2" />
              Person
            </label>

            <label>
              <input type="checkbox" name="category" value="3" />
              Study
            </label>

            <label>
              <input type="checkbox" name="category" value="4" />
              Shopping
            </label>

            <label>
              <input type="checkbox" name="category" value="5" />
              Ideas
            </label>

            <label>
              <input type="checkbox" name="category" value="6" />
              Important
            </label>
          </div>
          <button className="create-note-button">Create Note</button>
        </div>
      </div>
      <div>
        <div className="note-grid">
          <div className="note-card">
            <div className="note-title-box">
              <p className="note-title">Note Title</p>
              <div className="note-categories">
                <p>Study</p>
                <p>Shopping</p>
                <p>Ideas</p>
              </div>
            </div>
            <p className="note-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              quas necessitatibus veniam suscipit illum labore nostrum illo
              aperiam, ea aliquid. Ad quo, fugiat cum eveniet placeat pariatur,
              dignissimos expedita iusto, nisi quam nam. Fugiat, unde
              consectetur? Animi, deleniti nesciunt atque, aperiam veniam
              maxime, veritatis corrupti minima accusantium hic error unde.
            </p>
            <p className="note-date">
              Created at: <span>01-05-2025</span>
            </p>
            <p className="note-date">
              Last update: <span>01-05-2025</span>
            </p>
            <div className="note-actions">
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
