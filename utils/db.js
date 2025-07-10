import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to DB");
  } catch (err) {
    console.log("mongodb connection failed", err.message);
    process.exit(1);
  }
};
export { connectDB };
