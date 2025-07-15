import express, { Request, Response } from "express";
import multer from "multer";
import { storageForHotels } from "../config/cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

// const storage = multer.memoryStorage();
const upload = multer({
  storage: storageForHotels,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // 5MB limit

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Hotel name is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities must be an array"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night must be a positive number"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      if (!imageFiles || imageFiles.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }
      const newHotel: HotelType = req.body;
      console.log("New Hotel file", newHotel);

      newHotel.imageUrls = imageFiles.map((file) => file.path);
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const createdHotel = new Hotel(newHotel);
      await createdHotel.save();

      return res.status(201).json(createdHotel);
    } catch (error) {
      console.log("Error creating hotel:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findOne({ _id: id });
    if (hotel) {
      return res.status(400).json({ message: "There is no hotel" });
    }
    res.json(hotel);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const { hotelId } = req.params;
      const updatedHotel: HotelType = req.body;

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(400).json({ message: "There is no hotel" });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrl = files.map((file) => file.path);

      hotel.imageUrls = [...updatedImageUrl, ...(updatedHotel.imageUrls || [])];

      await hotel.save();
    } catch (error) {
      console.error("Error fetching hotels:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
