import expressAsyncHandler from "express-async-handler"; 
import { pool } from "../connectToDatabase/DbConnection.js";

// create note controller
export const createNoteController = expressAsyncHandler(
  async (req, res, next) => {
    const {note} = req.body;
    const {title} = req.body;
    const userId = req.user.id;
    const date = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kathmandu" });

    const[result] = await pool.query("Insert into notes (user_id,title,note,created_date) values (?,?,?,?)",[userId,title,note,date])
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note_id: result.insertId
    });
  }
);

// read all note controller
export const readAllNoteController = expressAsyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const [notes] = await pool.query("select * from notes where  user_id = ?",[userId]);
    res.status(200).json({
      success: true,
      message: "All notes read successfully",
      result:notes
    });
  }
);

// read specific note controller
export const readNoteController = expressAsyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const noteId = req.params.id;
    const [notes] = await pool.query("select * from notes where  user_id = ? and note_id = ?",[userId,noteId]);
    if(notes.length === 0)
    {
      let error = new Error("No note found");
      error.status(400);
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Note read successfully",
      result:notes[0]
    });
  }
);

// update specific note controller
export const updateNoteController = expressAsyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const noteId = req.params.id;

     const { title, note } = req.body;

    // Build the update parts dynamically
    const updates = [];
    const values = [];

    if (title) {
      updates.push("title = ?");
      values.push(title);
    }

    if (note) {
      updates.push("note = ?");
      values.push(note);
    }

     if (updates.length === 0) {
      let error = new Error("No valid fields to update");
      error.status = 400;
      throw error;
    }

    // Add userId and noteId to the query values
    values.push(userId, noteId);
    const sql = `update notes set ${updates.join(", ")} where user_id=? and note_id=?`;
    const [result] = await pool.query(sql,values);

    if(result.affectedRows === 0) {
      let error = new Error("Note not found or no changes made");
      error.status = 404;
      throw error;
    }
    res.status(201).json({
      success: true,
      message: "Note updated successfully",
    });
  }
);

//delete specific note controller
export const deleteNoteController = expressAsyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const noteId = req.params.id;
    const [result] = await pool.query("delete from notes where user_id=? and note_id=?",[userId,noteId]);
    
    if(result.affectedRows === 0)
    {
      let error = new Error("Note not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  }
);
