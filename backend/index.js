import express, { json } from "express";

import { port } from "./src/constant.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import noteRouter from "./src/route/note.route.js";
import { connectToDatabase } from "./src/connectToDatabase/DbConnection.js";
import authRouter from "./src/route/auth.route.js";

const app = express(); //creating an express app

app.use(json()); 


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
