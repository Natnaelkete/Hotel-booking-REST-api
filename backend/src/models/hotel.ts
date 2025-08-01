import mongoose from "mongoose";
import { BookingType, HotelType } from "../shared/type";

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  childCount: { type: Number, required: true },
  adultCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
});

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
    bookings: [bookingSchema],
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);

export default Hotel;
