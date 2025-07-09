import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.MONGO_URL as string)
      .then((con) => console.log(`MongoDb Connected:${con.connection.host}`));
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};
