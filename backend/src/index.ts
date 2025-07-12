import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./config/DB";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute";
import loginRoute from "./routes/auth";
import myHotelsRoute from "./routes/my-hotels";

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

connectDb();

app.use("/api/user", userRoute);
app.use("/api/user", loginRoute);
app.use("/api/myHotels", myHotelsRoute);

app.listen(7000, () => {
  console.log("Server is running of localhost:7000");
});
