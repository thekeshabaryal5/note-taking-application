import cookieParser from "cookie-parser";
import express, { json } from "express";

import { connectToDatabase } from "./src/connectToDatabase/DbConnection.js";
import { port } from "./src/constant.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import authRouter from "./src/route/auth.route.js";
import noteRouter from "./src/route/note.route.js";
import { customCors } from "./src/utils/corsOptions.js";
import limiter from "./src/utils/rateLimiter.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";

const app = express(); //creating an express app

// body parsers
app.use(json());
app.use(express.urlencoded({ extended: true }));

// enable custom cors
app.use(customCors());

// add rate-limiter
app.use(limiter);

//cookie parsers
app.use(cookieParser());

//server swagger UI at /api-docs
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
  console.log(`Express app running at port ${port}`);

  //connecting to Db
  connectToDatabase();
});

//make static folder for storing profile picture
app.use(express.static("./public"));

app.use("/api/user", authRouter);
app.use("/api/note", noteRouter);

// handaling error via errorMiddleware
app.use(errorMiddleware);
