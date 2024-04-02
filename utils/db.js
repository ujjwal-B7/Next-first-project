import mongoose from "mongoose";
let isConnected = false;
export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongodb is already connected.");
    return;
  }
  try {
    await mongoose.connect(process.env.DB, {
      dbName: "promptapp",
      // useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    isConnected = true;
    console.log("Mongodb connected.");
  } catch (error) {
    console.log(error);
  }
};
