import { Router } from "express";
import {
  createNoteController,
  deleteNoteController,
  readAllNoteController,
  readNoteController,
  updateNoteController,
} from "../controller/note.controller.js";
let noteRouter = Router();
noteRouter.route("/").post(createNoteController).get(readAllNoteController);

noteRouter
  .route("/:id")
  .get(readNoteController)
  .patch(updateNoteController)
  .delete(deleteNoteController);

export default noteRouter;
