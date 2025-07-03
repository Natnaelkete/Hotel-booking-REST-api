import express, { Request, Response } from "express";
import User from "../models/user";

const router = express.Router();

router.get("/register", async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    user = new User(req.body);

    user.save();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;
