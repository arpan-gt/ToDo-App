import express from "express";
import { userRouter } from "./routes/user.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/add", (req, res) => {
  res.send("add new task");
});

app.get("/mytasks", (req, res) => {
  res.send("my all tasks");
});

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
