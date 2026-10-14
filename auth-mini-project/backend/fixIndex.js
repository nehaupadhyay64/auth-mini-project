import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB connected");

  await mongoose.connection.collection("users").dropIndex("emil_1");

  console.log("emil_1 index deleted successfully");

  await mongoose.disconnect();
} catch (err) {
  console.error("ERROR:", err.message);
}