import mongoose from "mongoose";

const connectDB =  () => {
  mongoose
    .connect(process.env.MONGODB_URI || "")
    .then(() => {
      console.log("Connected");
    })
    .catch((err: Error) => {
      console.log("Failed", err);
    });
};

export default connectDB;
