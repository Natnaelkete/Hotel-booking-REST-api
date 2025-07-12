import mongoose from "mongoose";

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  country: string;
  city: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls?: string[];
  lastUpdated: Date;
};

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
