import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectToDatabase } from "./src/connectToDatabase/DbConnection.js";
import { port } from "./src/constant.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import authRouter from "./src/route/auth.route.js";
import noteRouter from "./src/route/note.route.js";
import { customCors } from "./src/utils/corsOptions.js";

const app = express(); //creating an express app

// body parsers
app.use(json());
app.use(express.urlencoded({ extended: true }));

// enable custom cors
app.use(customCors());

//cookie parsers
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Express app running at port ${port}`);

  //connecting to Db
  connectToDatabase();
});

app.use(express.static("./public"));

app.use("/api/user", authRouter);
app.use("/api/note", noteRouter);

// handaling error via errorMiddleware
app.use(errorMiddleware);
