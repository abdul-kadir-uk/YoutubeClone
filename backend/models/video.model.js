import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  commentText: {
    type: String,
    required: true,
    maxlength: 500
  },
  likesUserIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  dislikesUserIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

const VideoSchema = mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true
  },
  channelName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true,
    trim: true
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  viewers: {
    type: [String],
    default: []
  },
  likesUserIds: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  dislikesUserIds: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
  ],
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  comments: [CommentSchema]
});

const Video = mongoose.model("Video", VideoSchema);
export default Video;
