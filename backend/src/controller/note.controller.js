import expressAsyncHandler from "express-async-handler";

// create note controller
export const createNoteController = expressAsyncHandler(
  async (req, res, next) => {
    res.status(201).json({
      success: true,
      message: "Note created successfully",
    });
  }
);

// read all note controller
export const readAllNoteController = expressAsyncHandler(
  async (req, res, next) => {
    res.status(200).json({
      success: true,
      message: "All notes read successfully",
    });
  }
);

// read specific note controller
export const readNoteController = expressAsyncHandler(
  async (req, res, next) => {
    res.status(200).json({
      success: true,
      message: "Read specified note successfully",
    });
  }
);

// update specific note controller
export const updateNoteController = expressAsyncHandler(
  async (req, res, next) => {
    res.status(201).json({
      success: true,
      message: "Updated specified note successfully",
    });
  }
);

//delete specific note controller
export const deleteNoteController = expressAsyncHandler(
  async (req, res, next) => {
    res.status(200).json({
      success: true,
      message: "Deleted specified note successfully",
    });
  }
);
