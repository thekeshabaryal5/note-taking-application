import React, { useEffect, useState, useMemo } from "react";
import { getCategoryApi, noteApi } from "../const";
import axios from "axios";

// Custom hook to debounce a value
// This delays updating debounced until user stops typing for delay ms
function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t); // Cleanup on new value change
  }, [value, delay]);
  return debounced;
}

const Dashboard = () => {
  // state variable
  const [notes, setNotes] = useState([]); // All notes fetched from API
  const [error, setError] = useState(""); // Error message
  const [noteCategories, setNoteCategories] = useState([]); // All categories fetched from API
  const [editingNoteId, setEditingNoteId] = useState(null); // Track which note is being edited
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newNote, setNewNote] = useState({
    title: "",
    note: "",
    categories: [],
  });

  const [searchTerm, setSearchTerm] = useState(""); // Search box input
  const debouncedSearch = useDebounce(searchTerm, 250); // Debounced search term

  //API calls
  const fetchCategory = async () => {
    try {
      const response = await axios.get(getCategoryApi);
      setNoteCategories(response.data.data); // Store all categories
      setError("");
    } catch (err) {
      setError("Failed to fetch categories: " + err);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${noteApi}?page=${page}&limit=5`, {
        withCredentials: true, // Include cookies/session
      });
      setNotes(response.data.result); // Store all notes
      console.log(response);
      setTotalPages(response.data.pagination.totalPages); // track total pages fetched
      setError("");
    } catch (err) {
      setError("Failed to fetch notes  " + err);
    }
  };

  // Create or update a note
  const handleCreateOrUpdateNote = async () => {
    try {
      if (editingNoteId) {
        // Update note
        await axios.patch(
          `${noteApi}/${editingNoteId}`,
          {
            note: newNote.note,
            title: newNote.title,
          },
          { withCredentials: true }
        );
        setEditingNoteId(null); // Reset edit mode
      } else {
        // Create new note
        await axios.post(noteApi, newNote, { withCredentials: true });
      }

      // Reset input fields after submit
      setNewNote({ title: "", note: "", categories: [] });
      fetchNotes(); // Refresh notes
      setError("");
    } catch (err) {
      console.log(err?.response?.data?.message ?? err);
      setError(err?.response?.data?.message ?? "Something went wrong");
    }
  };

  // load form fields when editing
  const handleEditNote = (note) => {
    setNewNote({
      title: note.title,
      note: note.note,
      categories: note.categories || [],
    });
    setEditingNoteId(note.note_id);
  };

  // Delete note after confirmation
  const handleDeleteNote = async (note) => {
    try {
      if (confirm("Are you sure want to delete? ")) {
        await axios.delete(`${noteApi}/${note.note_id}`, {
          withCredentials: true,
        });
        fetchNotes(); // Refresh notes
        setError("");
      }
    } catch (err) {
      setError("Failed to delete note: " + err);
    }
  };

  // Fetch categories and notes when components mounts
  useEffect(() => {
    fetchCategory();
    fetchNotes();
  }, [page]);

  // Filtered notes (search by title, content, or category)
  const filteredNotes = useMemo(() => {
    const q = (debouncedSearch || "").trim().toLowerCase();
    if (!q) return notes; // if no search then show all notes

    const words = q.split(/\s+/); // Split search term into words

    return notes.filter((n) => {
      // Build search string from title + content + category names
      const categoryNames = (n.categories || [])
        .map((catId) => {
          const found = noteCategories.find((c) => c.id === catId);
          return found ? found.type : "";
        })
        .join(" ");

      const hay = (
        (n.title || "") +
        " " +
        (n.note || "") +
        " " +
        categoryNames
      ).toLowerCase();

      // Only include notes where all search words are found
      return words.every((w) => hay.includes(w));
    });
  }, [notes, debouncedSearch, noteCategories]);

  return (
    <>
      <div className="dashboard-container">
        {/* Search bar*/}
        <div className="dashboard-header">
          <h2 className="dashboard-title">My Notes</h2>
          <input
            type="text"
            name="search"
            placeholder="search notes"
            className="notes-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Show error if any */}
        {error && <p className="error">{error}</p>}

        {/* * Note creation/update form */}
        <div className="note-input-container">
          {/* Note title */}
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
          {/* Note content */}
          <textarea
            className="note-textarea"
            name="note"
            placeholder="your notes goes here"
            rows="4"
            value={newNote.note}
            onChange={(e) =>
              setNewNote((prev) => ({ ...prev, note: e.target.value }))
            }
          />
          <div className="note-footer">
            <p>Select Category</p>
            <div className="note-category">
              {noteCategories.map((value) => {
                return (
                  <label key={value.id}>
                    <input
                      type="checkbox"
                      value={value.id}
                      checked={newNote.categories.includes(Number(value.id))}
                      onChange={(e) => {
                        const id = Number(e.target.value);
                        setNewNote((prev) => {
                          const categories = prev.categories || [];
                          if (e.target.checked) {
                            // Add category if checked
                            return { ...prev, categories: [...categories, id] };
                          } else {
                            // Remove category if unchecked
                            return {
                              ...prev,
                              categories: categories.filter((c) => c !== id),
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
            {/* Submit button */}
            <button
              className="create-note-button"
              onClick={handleCreateOrUpdateNote}
            >
              {editingNoteId ? "Update Note" : "Create Note"}
            </button>
          </div>
        </div>

        {/* Notes list*/}
        <div>
          <div className="note-grid">
            {filteredNotes.length > 0 &&
              filteredNotes.map((value) => {
                return (
                  <div className="note-card" key={value.note_id}>
                    {/* Note title and categories */}
                    <div className="note-title-box">
                      <p className="note-title">{value.title}</p>
                      <div className="note-categories">
                        {value.categories.map((v) => {
                          const found = noteCategories.find((w) => w.id === v);
                          return <p key={v}>{found?.type ?? "Unknown"}</p>;
                        })}
                      </div>
                    </div>

                    {/* Note content */}
                    <p className="note-text">{value.note}</p>

                    {/* Note dates */}
                    <p className="note-date">
                      Created at: {value.created_date?.split("T")[0]}
                    </p>
                    <p className="note-date">
                      Last update: {value.update_date?.split("T")[0]}
                    </p>

                    {/* Actions */}
                    <div className="note-actions">
                      <button
                        className="edit-button"
                        onClick={() => handleEditNote(value)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteNote(value)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Dashboard;
