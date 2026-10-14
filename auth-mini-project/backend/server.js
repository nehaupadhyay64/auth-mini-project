import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
// ... 

dotenv.config();

const PORT=5000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("MongoDB is connected successfully✅."))
.catch((err)=> console.log("MongoDB connection failed",err));

app.get("/",(req,res)=>{
    console.log("Auth Mini Project backend is running")
});
app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`);
});

