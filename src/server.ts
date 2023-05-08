import express from "express";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/errorHandler";
import { userRouter } from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use(userRouter);

//Error handler middleware
app.use(errorMiddleware);

app.listen(3333, () => {
  console.log("Server is Running");
});
