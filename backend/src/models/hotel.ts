import mongoose from "mongoose";
import { HotelType } from "../shared/type";

const hotelSchema = new mongoose.Schema<HotelType>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true },
    imageUrls: [{ type: String }],
    lastUpdated: { type: Date, default: Date.now, required: true },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);

export default Hotel;
