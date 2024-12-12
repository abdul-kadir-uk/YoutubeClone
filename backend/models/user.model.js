// models/user.model.js
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  Subscriptions: {
    type: [String],
    default: []
  }
})

const User = mongoose.model("User", userSchema);

export default User;