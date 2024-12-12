import User from "../models/user.model.js";
import Channel from "../models/channel.model.js";

export const UserDetails = async (req, res) => {
  try {
    // get user id 
    const userId = req.user;
    //  find user
    const user = await User.findOne({ _id: userId });
    // if user not found 
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    // find channel
    const channel = await Channel.findOne({ UserId: userId });
    //  when chennel not found 
    if (!channel) {
      return res.status(200).json({
        user,
        channelexist: ""
      })
    }
    // when channel found 
    return res.status(200).json({
      user,
      channelexist: channel,
    });
  } catch (error) {
    // handle errors 
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};


// save subscriptions 
export const subscriptions = async (req, res) => {
  // get user id 
  const userId = req.user;
  // get channel id from url parameters 
  const { id } = req.params;

  try {
    // validate user id and channel id 
    if (!userId || !id) {
      return res.status(400).json({
        message: "user id and channel id are required"
      })
    }
    // find user 
    const user = await User.findById(userId);
    // find channel
    const channel = await Channel.findById(id);
    //  if user or channel id not found 
    if (!user || !channel) {
      return res.status(400).json({
        message: "user or channel not found"
      })
    }
    // add channel id in subscription if not found 
    if (!user.Subscriptions.includes(id)) {
      user.Subscriptions.push(id);
      // save user 
      await user.save();
      channel.Subscribers += 1;
      await channel.save();
      return res.status(200).json({
        message: "subscription added successfully",
        subscriptions: user.Subscriptions,
        subscribers: channel.Subscribers
      })
    }
    // if already have channel id remove it 
    user.Subscriptions = user.Subscriptions.filter((sub) => sub != id);
    await user.save();
    channel.Subscribers -= 1;
    await channel.save();
    return res.status(200).json({
      message: "subscription removed",
      subscriptions: user.Subscriptions,
      subscribers: channel.Subscribers
    })


  } catch (error) {
    // handle errors 
    console.log(error);
    return res.status(500).json({
      message: "something went wrong try again"
    })
  }
}

// Get subscriptions details
export const subscriptionDetails = async (req, res) => {
  // get user id 
  const UserId = req.user;

  try {
    // find user
    const user = await User.findById(UserId);
    // if user not found 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const channelIds = user.Subscriptions || [];
    // if no subcriptions
    if (channelIds.length === 0) {
      return res.status(404).json({
        user: user,
        message: "No subscriptions found. Subscribe to channels to see subscriptions.",
      });
    }

    // Fetch all subscribed channels
    const promises = channelIds.map((id) => Channel.findById(id));
    const channelDetails = await Promise.all(promises);

    // Return channel details
    return res.status(200).json({ channels: channelDetails });

  } catch (error) {
    // handle errors 
    console.error("Error fetching subscription details:", error); // Log the error
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};
