import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./config/DB";
import userRoute from "./routes/userRoute";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDb();

app.use("/api", userRoute);

app.listen(7000, () => {
  console.log("Server is running of localhost:7000");
});
