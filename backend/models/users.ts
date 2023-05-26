import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  userName: String,
  score: Number,
});

const Users =  mongoose.model("users", usersSchema);
export {Users};
