import expressAsyncHandler from "express-async-handler";
import { pool } from "../connectToDatabase/DbConnection.js";

// create note controller
export const createNoteController = expressAsyncHandler(
  async (req, res, next) => {
    const { note, title, categories } = req.body;
    const userId = req.user.id;
    const date = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kathmandu",
    });

    const connection = await pool.getConnection();
    try {
      // check if the note with same title exists before or not
      const [notes] = await connection.query(
        "SELECT * FROM notes WHERE user_id = ? AND LOWER(title) = LOWER(?)",
        [userId, title]
      );
      if (notes.length !== 0) {
        let error = new Error("Notes with same title already exists");
        error.status = 409;
        throw error;
      }
      // Add note
      const [result] = await connection.query(
        "Insert into notes (user_id,title,note,created_date,update_date) values (?,?,?,?,?)",
        [userId, title, note, date, date]
      );

      const noteId = result.insertId;
      // Bulk insert into note_category
      const noteCategoryValues = categories.map((catId) => [noteId, catId]);
      await connection.query(
        `INSERT INTO note_category (note_id, category_id) VALUES ?`,
        [noteCategoryValues]
      );
      await connection.commit();

      res.status(201).json({
        success: true,
        message: "Note created successfully",
        note_id: result.insertId,
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
);

// read all note controller
export const readAllNoteController = expressAsyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const [notes] = await pool.query("select * from notes where  user_id = ?", [
      userId,
    ]);

    for (const note of notes) {
      const [categories] = await pool.query(
        "select category_id from note_category where note_id=?",
        [note.note_id]
      );
      note.categories = categories.map((value, i) => value.category_id);
    }

    res.status(200).json({
      success: true,
      message: "All notes read successfully",
      result: notes,
    });
  }
);

// read specific note controller
export const readNoteController = expressAsyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const noteId = req.params.id;
    const [notes] = await pool.query(
      "select * from notes where  user_id = ? and note_id = ?",
      [userId, noteId]
    );
    if (notes.length === 0) {
      let error = new Error("No note found");
      error.status(400);
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Note read successfully",
      result: notes[0],
    });
  }
);

// update specific note controller
export const updateNoteController = expressAsyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const noteId = req.params.id;
    const update_date = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kathmandu",
    });

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

    // Add update_date userId and noteId to the query values
    values.push(update_date, userId, noteId);

    const sql = `update notes set ${updates.join(
      ", "
    )},update_date=? where user_id=? and note_id=?`;
    const [result] = await pool.query(sql, values);

    if (result.affectedRows === 0) {
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
    const [result] = await pool.query(
      "delete from notes where user_id=? and note_id=?",
      [userId, noteId]
    );

    if (result.affectedRows === 0) {
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
