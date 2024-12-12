import User from './../models/user.model.js'
import Video from '../models/video.model.js';

// get comments 
export const getComments = async (req, res) => {
  try {
    // get the video id from url 
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Video ID is required." });
    }

    // Find the video by ID
    const video = await Video.findById(id);
    // when video not found 
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }
    // sort comment in order newest first 
    const comments = video.comments.reverse();
    // Return the comments of the video
    return res.status(200).json({ comments });
  } catch (error) {
    // handle errors 
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching comments.", error: error.message });
  }
};

//  add comment 
export const createComment = async (req, res) => {
  try {
    // get user id 
    const userId = req.user;
    // get video id from url parameters 
    const { id } = req.params;
    // get comment data from body 
    const {
      commentText,
      likes,
      dislikes,
    } = req.body;

    // Validate input
    if (!id || !commentText) {
      return res.status(400).json({ message: "Video ID and comment text are required." });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if video exists
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    // Add the comment to the video's comments array
    const comment = {
      userId: userId,
      userName: user.name,
      commentText: commentText,
      likes: likes,
      dislikes: dislikes
    };
    video.comments.push(comment);

    // Save the updated video
    await video.save();

    // when successfully add the comments 
    return res.status(201).json({ message: "Comment added successfully.", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding the comment.", error: error.message });
  }
};

// update comment 
export const updateComment = async (req, res) => {
  // get user id 
  const userId = req.user;
  // get video id 
  const { id } = req.params;
  try {
    // get comment data from body 
    const { commentId, updatedText, likes, dislikes } = req.body;

    // Validate input
    if (!commentId || !id) {
      return res.status(400).json({ message: "Comment ID, Video ID are required" });
    }

    // Find the video and update the comment
    const video = await Video.findOne({
      _id: id,
    });
    // when video not found 
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    // find the specific comment
    const comment = video.comments.id(commentId);
    // when comment not found 
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }
    // if comments not belongs to user
    if (comment.userId != userId) {
      return res.status(400).json({
        message: "can't update others comments"
      })
    }
    // update the comments 
    comment.commentText = updatedText;
    comment.likes = likes;
    comment.dislikes = dislikes;
    // save the video 
    await video.save();

    return res.status(200).json({ message: "Comment updated successfully.", comment });
  } catch (error) {
    // handle errors 
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the comment.", error: error.message });
  }
};

// delete comment
export const deleteComment = async (req, res) => {
  try {
    // get user id 
    const userId = req.user;
    // get video id 
    const { id } = req.params;
    // get comment id 
    const { commentId } = req.body;

    // Validate input
    if (!commentId || !id) {
      return res.status(400).json({ message: "Comment ID and Video ID are required." });
    }

    // Find the video by id 
    const video = await Video.findOne({
      _id: id,
    });
    // if video no found 
    if (!video) {
      return res.status(404).json({ message: "Video or comment not found." });
    }
    // find a comment by id 
    const comment = video.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "comment not found"
      })
    }
    // if comment not belongs to user 
    if (comment.userId != userId) {
      return res.status(400).json({
        message: "you cant delete others comment"
      })
    }

    // Remove the specific comment
    video.comments = video.comments.filter(comment => comment._id.toString() !== commentId);

    // Save the updated video document
    await video.save();

    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    // handle errors 
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the comment.", error: error.message });
  }
};


