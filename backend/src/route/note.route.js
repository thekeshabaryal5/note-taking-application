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

let noteRouter = Router();
noteRouter
  .route("/")
  .post(authenticate, noteValidation(noteValidationRule), createNoteController)
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
