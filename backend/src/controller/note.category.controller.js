import expressAsyncHandler from "express-async-handler";
import { pool } from "../connectToDatabase/DbConnection.js";

const readAllNoteCategory = expressAsyncHandler(async (req, res, next) => {
  const [category] = await pool.query("select * from category");
  console.log(category);
  res.status(200).json({
    success: true,
    data: category,
  });
});

export default readAllNoteCategory;
