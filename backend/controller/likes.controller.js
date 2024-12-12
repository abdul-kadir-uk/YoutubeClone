import Video from "../models/video.model.js";
// video states 
export const videoStates = async (req, res) => {
  // get user id 
  const userId = req.user;
  // get video id from url parameters 
  const { id } = req.params;
  let likestate;
  let dislikestate;
  try {
    // if user or vido id not found 
    if (!userId || !id) {
      return res.status(400).json({
        message: "user id and video id are required"
      })
    }
    // find  video by id 
    const video = await Video.findById(id);
    // when video not found 
    if (!video) {
      return res.status(404).json({
        message: "video not found"
      })
    }
    //  check like status 
    const likeindex = video.likesUserIds.findIndex((user) => user.toString() == userId);
    if (likeindex == -1) {
      likestate = false
    } else {
      likestate = true
    }
    //  check dislike status 
    const dislikeindex = video.dislikesUserIds.findIndex((user) => user.toString() == userId);
    if (dislikeindex == -1) {
      dislikestate = false
    } else {
      dislikestate = true
    }

    return res.status(200).json({
      likestate,
      dislikestate,
      likes: video.likes,
      dislikes: video.dislikes
    })

  } catch (error) {
    // handle error 
    res.status(500).json({
      message: "somethng went wrong try again"
    })
  }
}

// Video likes
export const videoLikes = async (req, res) => {
  // get user id 
  const userId = req.user;
  // get video id 
  const { id } = req.params;

  try {
    // validate the user and video id
    if (!userId || !id) {
      return res.status(401).json({
        message: "User ID and video ID are required"
      });
    }
    // find video
    const video = await Video.findById(id);
    // if video not found 
    if (!video) {
      return res.status(404).json({
        message: "Video does not exist"
      });
    }

    const likeindex = video.likesUserIds.findIndex((userid) => userid.toString() === userId);

    const dislikeindex = video.dislikesUserIds.findIndex((userid) => userid.toString() === userId);
    // if user dislike the video, then remove dislike first 
    if (dislikeindex != -1) {
      video.dislikesUserIds.splice(dislikeindex, 1);
      video.dislikes -= 1;
    }

    if (likeindex === -1) {
      // User has not liked the video , like it
      video.likesUserIds.push(userId);
      video.likes += 1;
    } else {
      // User has already liked the video, remove like
      video.likesUserIds.splice(likeindex, 1);
      video.likes -= 1;
    }
    // save video
    await video.save();
    return res.status(200).json({
      message: "Likes updated successfully",
      likes: video.likes,
    });

  } catch (error) {
    // handle error 
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again"
    });
  }
};

// Video dislikes 
export const videoDisLikes = async (req, res) => {
  // get user id 
  const userId = req.user;
  // get video id 
  const { id } = req.params;

  try {
    // validate user id and video id 
    if (!userId || !id) {
      return res.status(401).json({
        message: "User ID and video ID are required"
      });
    }
    // find video 
    const video = await Video.findById(id);
    // if video not found 
    if (!video) {
      return res.status(404).json({
        message: "Video does not exist"
      });
    }
    // check for the like
    const likeindex = video.likesUserIds.findIndex((userid) => userid.toString() === userId);
    // check for the dislike
    const dislikeindex = video.dislikesUserIds.findIndex((userid) => userid.toString() === userId);
    // if user liked, then remove first
    if (likeindex != -1) {
      video.likesUserIds.splice(likeindex, 1);
      video.likes -= 1;
    }

    if (dislikeindex === -1) {
      // User has not disliked the video , add dislike
      video.dislikesUserIds.push(userId);
      video.dislikes += 1;
    } else {
      // User has already disliked the video, remove dislike
      video.dislikesUserIds.splice(dislikeindex, 1);
      video.dislikes -= 1;
    }
    //  save the video 
    await video.save();
    return res.status(200).json({
      message: "Likes updated successfully",
      dislikes: video.dislikes,
    });

  } catch (error) {
    // handle errors 
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again"
    });
  }
};

// Comment likes  
export const commentLikes = async (req, res) => {
  // get user id 
  const userId = req.user;
  // get video id 
  const { id } = req.params;
  // get comment id 
  const { commentId } = req.body;

  try {
    // validate userid, videoid, and comment id
    if (!userId || !id || !commentId) {
      return res.status(401).json({
        message: "User ID, video ID, and comment Id are required"
      });
    }

    const video = await Video.findById(id);
    // if video not found 
    if (!video) {
      return res.status(404).json({
        message: "Video does not exist"
      });
    }
    // find comment
    const comment = await video.comments.id(commentId);
    //  if comment not found 
    if (!comment) {
      return res.status(404).json({
        message: "comment not found"
      })
    }
    // check like
    const likeindex = comment.likesUserIds.findIndex((userid) => userid.toString() === userId);
    // check dislike
    const dislikeindex = comment.dislikesUserIds.findIndex((userid) => userid.toString() === userId);
    // if disliked, then remove it first 
    if (dislikeindex != -1) {
      comment.dislikesUserIds.splice(dislikeindex, 1);
      comment.dislikes -= 1;
    }
    //  toggle like 
    if (likeindex === -1) {
      // User has not liked the video , like it
      comment.likesUserIds.push(userId);
      comment.likes += 1;
    } else {
      // User has already liked the video, remove like
      comment.likesUserIds.splice(likeindex, 1);
      comment.likes -= 1;
    }

    await video.save();
    return res.status(200).json({
      message: "Likes updated successfully",
      likes: comment.likes,
    });

  } catch (error) {
    // handle errors 
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, please try again"
    });
  }
};

// Comment dislikes  
export const commentdisLikes = async (req, res) => {
  // get user id 
  const userId = req.user;
  // get video id 
  const { id } = req.params;
  // get comment id 
  const { commentId } = req.body;

  try {
    // validate user, video and comment id 
    if (!userId || !id || !commentId) {
      return res.status(401).json({
        message: "User ID video ID and comment id are required"
      });
    }

    const video = await Video.findById(id);
    // if video not found
    if (!video) {
      return res.status(400).json({
        message: "Video does not exist"
      });
    }
    // find comment 
    const comment = await video.comments.id(commentId);
    //  if comment not found 
    if (!comment) {
      return res.status(404).json({
        message: "comment not found"
      })
    }
    // check like
    const likeindex = comment.likesUserIds.findIndex((userid) => userid.toString() === userId);
    // check dislike
    const dislikeindex = comment.dislikesUserIds.findIndex((userid) => userid.toString() === userId);
    // if liked , then remove like first
    if (likeindex != -1) {
      comment.likesUserIds.splice(likeindex, 1);
      comment.likes -= 1;
    }
    // toggle dislike
    if (dislikeindex === -1) {
      // User has not disliked the video ,dislike it
      comment.dislikesUserIds.push(userId);
      comment.dislikes += 1;
    } else {
      // User has already disliked the video, remove dislike
      comment.dislikesUserIds.splice(dislikeindex, 1);
      comment.dislikes -= 1;
    }

    await video.save();
    return res.status(200).json({
      message: "DisLikes updated successfully",
      dislikes: comment.dislikes,
    });

  } catch (error) {
    // handle error 
    return res.status(500).json({
      message: "Something went wrong, please try again"
    });
  }
};
