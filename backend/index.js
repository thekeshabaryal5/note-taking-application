import express, { json } from "express";

import { port } from "./src/constant.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import noteRouter from "./src/route/note.route.js";

const app = express(); //creating an express app

app.use(json()); //enabling app to use json format

//assigning a port to express app
app.listen(port, () => {
  console.log(`Express app running at port ${port}`);

  //connecting to Db
});

app.use("/note", noteRouter);

// handaling error via errorMiddleware
app.use(errorMiddleware);
