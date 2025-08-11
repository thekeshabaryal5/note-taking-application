import { Router } from "express";
import {
  createNoteController,
  deleteNoteController,
  readAllNoteCategory,
  readAllNoteController,
  readNoteController,
  updateNoteController,
} from "../controller/note.controller.js";
import authenticate from "../middleware/authentication.js";
import noteValidation from "../middleware/note.validation.js";
import {
  noteUpdateValidationRule,
  noteValidationRule,
} from "../utils/validationRule.js";

// swagger docs
/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note Management
 */

/**
 * @swagger
 * /api/note:
 *   get:
 *     summary: Get all notes of the logged-in user
 *     tags: [Notes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - note
 *             properties:
 *               title:
 *                 type: string
 *               note:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/note/note-category:
 *   get:
 *     summary: Get all available note categories
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: List of categories
 */

/**
 * @swagger
 * /api/note/{id}:
 *   get:
 *     summary: Get a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Note details
 *       404:
 *         description: Note not found
 *   patch:
 *     summary: Update a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               note:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       404:
 *         description: Note not found
 *   delete:
 *     summary: Delete a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 */

let noteRouter = Router();
noteRouter
  .route("/")
  .post(authenticate, noteValidation(noteValidationRule), createNoteController) // authenticate user , validate notes and then update notes
  .get(authenticate, readAllNoteController);

noteRouter.route("/note-category").get(readAllNoteCategory);

noteRouter
  .route("/:id")
  .patch(
    authenticate,
    noteValidation(noteUpdateValidationRule),
    updateNoteController
  )
  .delete(authenticate, deleteNoteController)
  .get(authenticate, readNoteController);

export default noteRouter;
