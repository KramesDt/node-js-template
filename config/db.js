import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/Collection-name";
console.log("MONGO URI:", MONGO_URL)

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB Connected Successfully...");
  } catch (error) {
    // process.exit(1); // Exit process with failure
    throw new Error("DB Connection Failed!", error);
  }
};

export default connectDB;
