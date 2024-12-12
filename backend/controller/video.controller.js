import Channel from "../models/channel.model.js";
import Video from "../models/video.model.js";
import User from "../models/user.model.js";

//  upload video
export const uploadvideo = async (req, res) => {
  try {
    // get channel id 
    const { id } = req.params;
    // get video data 
    const { title, thumbnailUrl, videoUrl, description, category } = req.body;
    // find channel 
    const channel = await Channel.findById(id);
    // if channel not found 
    if (!channel) {
      return res.status(404).json({
        message: "channel not exist"
      })
    }
    // create video document
    const video = new Video({
      channelId: id,
      channelName: channel.ChannelName,
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category,
    })
    // save video document 
    await video.save();
    return res.status(201).json({
      message: "video uploaded successfully",
      video: video,
    })

  } catch (error) {
    // handle errors 
    res.status(500).json({
      message: "something went wrong try again"
    })
    console.log(error);
  }
}

// get videos 
export const getvideos = async (req, res) => {
  try {
    // get channel id from url parameters
    const { id } = req.params;
    // find videos by channel id 
    const videos = await Video.find({
      channelId: id
    })
    //  if no videos found 
    if (!videos || videos.length == 0) {
      return res.status(404).json({
        message: "no videos"
      })
    }

    return res.status(200).json(
      videos
    )
  } catch (error) {
    // handle errors 
    res.status(500).json({
      message: "something went wrong, try again"
    })
  }
}

// get video detail 
export const getvideo = async (req, res) => {
  try {
    // get video id 
    const { id } = req.params;
    // find video 
    const video = await Video.findById(id);
    // if video not found 
    if (!video) {
      return res.status(404).json({
        message: "video not exist"
      })
    }
    return res.status(200).json({
      video
    })
  } catch (error) {
    // handle error  
    res.status(500).json({
      message: "something went wrong try again"
    })
  }
}

//  update video details 
export const updateVideo = async (req, res) => {
  // get video id from url parameters
  const { id } = req.params;
  try {
    // get video details from user
    const {
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category } = req.body;

    // Update the channel with the provided details
    const video = await Video.findOneAndUpdate(
      { _id: id },
      { title, thumbnailUrl, videoUrl, description, category },
      // Returns the updated document
      { new: true }
    );
    //  if video not found 
    if (!video) {
      return res.status(400).json({
        message: "video does not exist",
      });
    }
    //  when video success fully updated
    return res.status(200).json({
      message: "video successfully updated",
      video: video,
    });
  } catch (error) {
    // handle error 
    res.status(500).json({
      message: "Something went wrong, please try again",
    });
    console.error(error);
  }
}

// delete video 
export const deletevideo = async (req, res) => {
  try {
    // get video id
    const { id } = req.params;
    // find video and delete
    const deleteVideo = await Video.findByIdAndDelete({ _id: id });
    // if video not found 
    if (!deleteVideo) {
      return res.status(404).json({
        message: "video not exist"
      })
    }
    // when video successfully deleted 
    return res.status(200).json({
      message: "video deleted successfully",
      video: deleteVideo
    })
  } catch (error) {
    // handle errors 
    res.status(500).json({
      message: "unable to delete, try again"
    })
  }
}

//  get home videos
export const getHomeVideos = async (req, res) => {
  try {
    // get user id 
    const userId = req.user;
    // find user 
    const user = await User.findById(userId);
    // if user not found 
    if (!user) {
      return res.status(401).json({ message: "Sign in to get videos." });
    }
    // get category 
    const categories = user.categories;
    // if categories not found 
    if (!categories || categories.length === 0) {
      return res.status(400).json({ message: "Categories array is required." });
    }

    // Use Promise.all to fetch videos concurrently for all categories
    const videoPromises = categories.map(category =>
      // Fetch up to 5 videos per category
      Video.find({ category }).sort({ timeStamp: -1 }).limit(5)
    );

    // Resolve all promises concurrently
    const videoResults = await Promise.all(videoPromises);

    // Flatten the array of results into a single array 
    const videos = videoResults.flat();

    // when successfully get all videos 
    return res.status(200).json(videos);
  } catch (error) {
    // handle errors 
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching videos." });
  }
};

// video by category 
export const get_videos_by_category = async (req, res) => {
  try {
    // get category from url parameters 
    const { category } = req.params;
    if (!category) {
      return res.status(404).json({
        message: "category not found"
      })
    }
    // find videos by category 
    const videos = await Video.find({ category }).sort({ timeStamp: -1 });
    // if videos not found 
    if (!videos || videos.length === 0) {
      return res.status(404).json({
        message: "videos not found for these category"
      })
    }
    // when successfullly get videos 
    return res.status(200).json(
      videos
    )
  } catch (error) {
    // handle errors 
    res.status(500).json({
      message: "something went wrong try again"
    })
  }
}

// get search videos
export const getSearchVideos = async (req, res) => {
  try {
    // get search text from url parameters
    const { searchText } = req.params;
    // Validate input
    if (!searchText || typeof searchText !== "string") {
      return res.status(400).json({
        message: "Search text is required and must be a string",
      });
    }

    // Perform the search
    const videos = await Video.find({
      $or: [
        { title: { $regex: searchText, $options: "i" } },
        { channelName: { $regex: searchText, $options: "i" } }
      ],
    });

    // Check if videos were found
    if (!videos || videos.length === 0) {
      return res.status(404).json({
        message: "Videos not found",
      });
    }

    // Respond with the found videos
    return res.status(200).json({ videos });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      message: "Something went wrong, please try again",
    });
    console.error(error); // Log the error for debugging
  }
};

// get videopage details 
export const getVideoPage = async (req, res) => {
  try {
    // get video id 
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "video id is required"
      })
    }
    // find video by id 
    const video = await Video.findById(id);
    // if video not found 
    if (!video) {
      return res.status(400).json({
        message: "video not found"
      })
    }
    // when successfully found the video 
    return res.status(200).json({
      video
    })
  } catch {
    // handle error 
    return res.status(500).json({
      message: "something went wrong try again"
    })
  }
}

export const updateviews = async (req, res) => {
  // get video id 
  const { id } = req.params;
  // get ip address of the user
  const Ip = req.ip;
  try {
    // validate the video id 
    if (!id) {
      return res.status(400).json({
        message: "video id is required"
      })
    }
    // if video not found 
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({
        message: "video is not found"
      })
    }

    const viewers = video.viewers;
    // if already watched by user
    if (viewers.includes(Ip)) {
      return res.status(200).json({
        message: "views already counted",
      })
    }
    //  increase views if not watch 
    video.viewers.push(Ip);
    video.views += 1;
    await video.save();
    //  when successfully updates views 
    return res.status(200).json({
      message: "views updated successfully",
      views: video.views,
    })
  } catch (error) {
    // handle errors 
    return res.status(500).json({
      message: "something went wrong try again"
    })
  }
}