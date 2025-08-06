import express, { json } from "express";
import cookieParser from "cookie-parser";

import { connectToDatabase } from "./src/connectToDatabase/DbConnection.js";
import { port } from "./src/constant.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import authRouter from "./src/route/auth.route.js";
import noteRouter from "./src/route/note.route.js";

const app = express(); //creating an express app

app.use(json()); 
app.use(cookieParser())

app.listen(port , () => {
  console.log(`Express app running at port ${port}`);

  //connecting to Db
  connectToDatabase()
});

app.use(express.static("./public"));

app.use("/note", noteRouter);
app.use("/api/auth",authRouter);


// handaling error via errorMiddleware
app.use(errorMiddleware);
