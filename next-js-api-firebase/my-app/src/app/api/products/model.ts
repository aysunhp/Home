import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    title: String,
  },
  {
    collection: "Users",
  }
);
const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
