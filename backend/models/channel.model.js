import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ChannelSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ChannelName: {
    type: String,
    required: true,
  },
  PickUrl: {
    type: String,
    required: true,
    trim: true
  },
  Description: {
    type: String,
    default: ""
  },
  Handle: {
    type: String,
    required: true,
    unique: true
  },
  Subscribers: {
    type: Number,
    default: 0
  },
})

const Channel = model("Channel", ChannelSchema);
export default Channel;