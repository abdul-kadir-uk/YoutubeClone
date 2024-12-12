import Channel from "../models/channel.model.js";

// Save channel details
export const CreateChannel = async (req, res) => {
  // get the user id 
  const UserId = req.user;
  try {
    // Check channel existence
    const channelExist = await Channel.findOne({ UserId: UserId });
    if (channelExist) {
      return res.status(400).json({
        message: "Channel already exists",
      });
    }

    // get the channel details from body
    const { ChannelName, PickUrl, Description, Handle } = req.body;

    // Check if the handle already exists
    const handleExist = await Channel.findOne({ Handle: Handle });

    if (handleExist) {
      return res.status(400).json({
        message: "handle in used, use another handle"
      })
    }

    // Create a new channel document
    const channel = new Channel({
      UserId,
      ChannelName,
      PickUrl,
      Description,
      Handle,
    });

    // Save the channel to the database
    await channel.save();

    // when channel successfully created
    return res.status(201).json({
      message: "Channel successfully created",
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      message: "Something went wrong, please try again",
    });
    console.error(error);
  }
};

// Get channel details
export const getChannel = async (req, res) => {
  // get the channel id from url parameters 
  const { id } = req.params;
  try {
    // Find the channel by its ID
    const channel = await Channel.findOne({ _id: id });
    // if channel not exist 
    if (!channel) {
      return res.status(400).json({
        message: "Channel does not exist",
      });
    }

    return res.status(200).json(channel);
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      message: "Something went wrong, please try again",
    });
    console.error(error);
  }
};

// Update channel details
export const updateChannel = async (req, res) => {
  // get the user id 
  const userId = req.user;
  try {
    // Check the channel exists 
    const channel = await Channel.findOne({ UserId: userId });
    // when channnel not found 
    if (!channel) {
      return res.status(400).json({
        message: "Channel does not exist",
      });
    }

    // get updated details from the body
    const { ChannelName, PickUrl, Description, Handle } = req.body;

    if (channel.Handle != Handle) {
      const handleExist = await Channel.findOne({
        Handle: Handle
      })

      if (handleExist) {
        return res.status(400).json({
          message: "handle in used, use another handle"
        })
      }
    }

    // Update the channel with the new details
    const updatedChannel = await Channel.findOneAndUpdate(
      { UserId: userId },
      { ChannelName, PickUrl, Description, Handle },
      { new: true }
    );
    // when successfully update 
    return res.status(200).json({
      message: "Channel successfully updated",
      channel: updatedChannel,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      message: "Something went wrong, please try again",
    });
    console.error(error);
  }
};
