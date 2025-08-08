import React, { useEffect, useState } from "react";
import { getCategoryApi, noteApi } from "../const";
import axios from "axios";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [noteCategories, setNoteCategories] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [newNote, setNewNote] = useState({
    title: "",
    note: "",
    categories: [],
  });
  const fetchCategory = async () => {
    try {
      const response = await axios.get(getCategoryApi);
      setNoteCategories(response.data.data);
    } catch (error) {
      setError("Failed to fetch notes " + error);
    }
  };
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${noteApi}`, {
        withCredentials: true,
      });
      setNotes(response.data.result);
    } catch (error) {
      setError("Failed to fetch notes " + error);
    }
  };
  const handleCreateOrUpdateNote = async () => {
    try {
      if (editingNoteId) {
        //update
        await axios.patch(`${noteApi}/${editingNoteId}`, newNote, {
          withCredentials: true,
        });
        setEditingNoteId(null);
      } else {
        //Insert
        console.log("Sending new note", newNote);
        const insert = await axios.post(noteApi, newNote, {
          withCredentials: true,
        });
      }
      setNewNote({ title: "", note: "", categories: [] });
      fetchNotes();
    } catch (error) {
      setError(`Failed to save note: ${error.message}`);
    }
  };
  useEffect(() => {
    fetchCategory();
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
          value={newNote.title}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          className="note-textarea"
          name="note"
          placeholder="your notes goes here"
          rows="4"
          value={newNote.note}
          onChange={(e) =>
            setNewNote((prev) => ({ ...prev, note: e.target.value }))
          }
        ></textarea>
        <div className="note-footer">
          <p>Select Category</p>
          <div className="note-category">
            {noteCategories.map((value, i) => {
              return (
                <label key={i}>
                  <input
                    type="checkbox"
                    value={value.id}
                    checked={newNote.categories.includes(Number(value.id))}
                    onChange={(e) => {
                      const id = Number(e.target.value);
                      setNewNote((prev) => {
                        const categories = prev.categories || [];
                        if (e.target.checked) {
                          return {
                            ...prev,
                            categories: [...categories, id],
                          };
                        } else {
                          return {
                            ...prev,
                            categories: noteCategories.filter((c) => c !== id),
                          };
                        }
                      });
                    }}
                  />
                  {value.type}
                </label>
              );
            })}
          </div>
          <button
            className="create-note-button"
            onClick={handleCreateOrUpdateNote}
          >
            {editingNoteId ? "Update Note" : "Create Note"}
          </button>
        </div>
      </div>
      <div>
        <div className="note-grid">
          {notes.length > 0 &&
            notes.map((value, i) => {
              return (
                <div className="note-card" key={i}>
                  <div className="note-title-box">
                    <p className="note-title">{value.title}</p>
                    <div className="note-categories">
                      {value.categories.map((v) => {
                        const type = noteCategories.filter((w) => w.id === v);
                        return <p key={v}>{type[0]?.type}</p>;
                      })}
                    </div>
                  </div>
                  <p className="note-text">{value.note}</p>
                  <p className="note-date">
                    Created at: {value.created_date.split("T")[0]}
                  </p>
                  <p className="note-date">
                    Last update: {value.update_date.split("T")[0]}
                  </p>
                  <div className="note-actions">
                    <button
                      className="edit-button"
                      onClick={() => {
                        setNewNote({
                          title: value.title,
                          note: value.note,
                          categories: value.categories,
                        });
                        setEditingNoteId(value.note_id);
                      }}
                    >
                      Edit
                    </button>
                    <button className="delete-button">Delete</button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
