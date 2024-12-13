import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { IoMdMore } from "react-icons/io";
import config from "../config";

const Channel = () => {
  // Redux states for sidebar and user channel ID
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const channelId = useSelector((state) => state.IdStates.channelId);

  // state for managing videos
  const [videos, setVideos] = useState([]);
  // states for checking channel belongs to owner
  const [channelMatch, setChannelMatch] = useState(false);
  // state for channel data
  const [channelData, setChannelData] = useState({
    name: "",
    pickurl: "",
    handle: "",
    description: "",
  });
  // state for checking which video options is click
  const [activeVideoId, setActiveVideoId] = useState(null);
  // state for checking channel is subscribed or not
  const [subscribed, setSubscribed] = useState(null);
  // state for storing subscribers
  const [subscribers, setSubscribers] = useState(null);
  // take Channel ID from the URL
  const { id } = useParams();
  // Navigation hook for navigation
  const navigate = useNavigate();
  // Token for authentication
  const token = localStorage.getItem("token");

  // get channel data from the backend
  const getChannelData = async () => {
    try {
      const response = await axios.get(`${config.URL}/channel/${id}`);
      const data = response.data;
      setChannelData({
        name: data.ChannelName,
        pickurl: data.PickUrl,
        handle: data.Handle,
        description: data.Description,
        subscribers: data.Subscribers,
      });
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  // get videos of the channel
  const getVideos = async () => {
    try {
      // if channel id not found return it
      if (!id) return;
      const response = await axios.get(
        `${config.URL}/video/getvideos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // if the response status code is 200 
      if (response.status === 200) {
        setVideos(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
        setVideos([]);
      }
    } catch (error) {
      console.error("Error fetching videos:", error.response?.data || error.message);
      setVideos([]);
    }
  };

  // Toggle video options menu for a specific video
  const handleMore = (videoId) => {
    setActiveVideoId((prev) => (prev === videoId ? null : videoId));
  };

  // Delete a video
  const handleDelete = async (videoID) => {
    try {
      const response = await axios.delete(
        `${config.URL}/video/deletevideo/${videoID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Remove deleted video from local state
        setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoID));
      } else {
        console.error("Failed to delete the video:", response.status);
      }
    } catch (error) {
      console.error("Error deleting the video:", error);
    }
  };

  // Navigate to the video's detail page
  const handleVideoData = (id) => {
    navigate(`/video/${id}`);
  };

  // Check the user is the owner of the channel
  const checkChannelMatch = () => {
    setChannelMatch(channelId === id);
  };

  // get user subscription status
  const getUserDetail = async () => {
    if (!token || !id) return;
    try {
      const response = await axios.get(`${config.URL}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setSubscribed(response.data.user.Subscriptions.includes(id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Subscribe and Unsubscribe the channel
  const handleSubscribe = async () => {
    try {
      // if user is not login then naviagte to signin page
      if (!token) {
        navigate("/signin");
        return;
      }
      const response = await axios.put(
        `${config.URL}/user/subscriptions/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubscribers(response.data.subscribers);
      // Refresh subscription status
      getUserDetail();
    } catch (error) {
      console.error(error);
    }
  };

  // get data on component mount and when channel id changes
  useEffect(() => {
    if (id) {
      getChannelData();
      getVideos();
      checkChannelMatch();
    }
  }, [id]);

  // get user details on component mount
  useEffect(() => {
    getUserDetail();
  }, []);
  // tabs of the channel
  const tabs = ["Videos", "Shorts", "Live", "Releases", "Playlists", "Community"];

  return (
    // layout for sidebar open and close
    <div
      className={`${isOpen ? "lg:pl-[230px] sm:pl-[200px] hidden sm:block" : "sm:pl-[100px]"
        } h-full pb-12 md:pb-24 overflow-y-auto w-full`}
    >
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="ml-5 md:ml-10 mt-5">
          {/* Channel Profile Picture */}
          <div className="relative md:w-40 md:h-40 sm:w-36 sm:h-36 w-28 h-28">
            <img src={channelData.pickurl} className="w-full h-full rounded-full" />
            {/* if the user is the ownr of the channel then alow to update details of the channel */}
            {channelMatch && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() => navigate(`/channel/updatechannel/${id}`)}
              >
                Update Profile
              </div>
            )}
          </div>
        </div>
        <div className="mt-10 px-4 sm:px-10">
          <div className="flex flex-col items-start">
            {/* Channel Information - name, handle, */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">{channelData.name}</h1>
              <p className="text-gray-600 mt-1">
                {channelData.handle} · {subscribers ?? channelData.subscribers} subscribers ·{" "}
                {videos.length} Videos
              </p>
              <p>{channelData.description}</p>
            </div>
            {/* Subscribe the channel */}
            {!channelMatch && (
              <button
                className={`${subscribed ? "bg-slate-300 text-black" : "bg-black text-white"
                  } px-4 py-2 rounded-full mt-4 sm:mt-2 hover:bg-slate-800`}
                onClick={handleSubscribe}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs of the channel */}
      <div className="flex flex-wrap sm:space-x-4 space-x-2 mt-4 border-b border-gray-300 md:ml-10 ml-3">
        {tabs.map((tab) => (
          <button key={tab} className="pb-2 text-sm font-medium hover:text-slate-500">
            {tab === "Videos" ? (
              <p className="text-xl underline font-bold">{tab}</p>
            ) : (
              tab
            )}
          </button>
        ))}
      </div>

      {/* Video Grid Section */}
      <div className="px-4 sm:px-10 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
              onClick={() => handleVideoData(video._id)}
            >
              {/* Video Thumbnail */}
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-32 sm:h-48 object-cover"
              />
              {/* Video Info */}
              <div className={`p-2 relative ${activeVideoId === video._id ? "pb-16" : ""}`}>
                <h2 className="font-semibold text-sm line-clamp-2">{video.title}</h2>
                <p className="text-xs text-gray-500">
                  {video.views} views · {moment(video.timeStamp).fromNow()}
                </p>
                {/* Video Options for Channel Owner */}
                {channelMatch && (
                  <button
                    className="absolute top-0 right-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMore(video._id);
                    }}
                  >
                    <IoMdMore className="w-7 h-7" />
                  </button>
                )}
                {/* Options Dropdown of the channel videos */}
                {activeVideoId === video._id && channelMatch && (
                  <div className="absolute z-10 right-0 top-8 bg-white shadow-md rounded-lg w-28">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/video/updatevideo/${video._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(video._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-8">
            No videos found for this channel.
          </p>
        )}
      </div>
    </div>
  );
};

export default Channel;
