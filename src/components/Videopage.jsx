import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import SimilarVideos from "./SimilarVideos";
import { useSelector } from "react-redux";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/similarVideosSlice";
import config from "../config";

const Videopage = () => {
  // get video id from url parameters 
  const { id } = useParams();
  // video state for storing video data
  const [video, setVideo] = useState({});
  // for storing related videos 
  const [relatedVideos, setRelatedVideos] = useState([]);
  // for loading 
  const [loading, setLoading] = useState(true);
  // for checking like status
  const [likeStatus, setLikeStatus] = useState(null);
  // for checking dislike status
  const [dislikeStatus, setdisLikeStatus] = useState(null);
  // for sidebar visibility 
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  // get category for similar videos 
  const category = useSelector((state) => state.similarVideos.category);
  // get the user channel id of the video
  const channelId = useSelector((state) => state.IdStates.channelId);
  // for checking video is watched  
  const [videoWatched, setVideoWatched] = useState(false);
  // calculate watch time
  const [watchedTime, setWatchedTime] = useState(0);
  // for skipping the video
  const [seeking, setSeeking] = useState(false);
  // for real time update 
  const [videoStates, setVideoStates] = useState({
    likes: "",
    dislikes: "",
  })
  // for video channel id 
  const [videoChannelId, setVideoChannelId] = useState(null);
  // for channel data 
  const [channelData, setChannelData] = useState({
    channelName: "",
    pickUrl: "",
    subscribers: ""
  })
  // for chacking subscribe status 
  const [subscribed, setSubscribed] = useState(false);
  // for real time subscribers update 
  const [subscribers, setSubscribers] = useState(null);
  // for navigation 
  const navigate = useNavigate();
  // for dispatching function 
  const dispatch = useDispatch();
  // get token from local storage 
  const token = localStorage.getItem("token");

  const getVideo = async () => {
    try {
      // axios get request for getting video data
      const response = await axios.get(`${config.URL}/video/${id}`);
      if (response.status === 200) {
        const videoData = response.data.video;
        setVideoChannelId(videoData.channelId);
        setVideo(videoData);
        dispatch(setCategory(videoData.category));
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching video:", error);
    }
  };

  const getSimilarVideos = async () => {
    try {
      // axios get request for getting video by category
      const response = await axios.get(
        `${config.URL}/video/category/${category}`
      );
      if (response.status === 200) {
        setRelatedVideos(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching similar videos:", error);
    }
  };
  // refetch video data when video id change
  useEffect(() => {
    getVideo();
  }, [id]);
  // refetch video by category when category change
  useEffect(() => {
    if (category) {
      getSimilarVideos();
    }
  }, [category]);

  const handleChannel = (channelId) => {
    // navigate to channel page 
    navigate(`/channel/${channelId}`);
  };

  const likeVideo = async () => {
    try {
      // if not sign in
      if (!token) {
        navigate('/signin');
        return
      };
      // axios put request for update likes 
      const response = await axios.put(
        `${config.URL}/video/${id}/likes`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // get video states 
        getvideoStates();
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const dislikeVideo = async () => {
    try {
      // when user not sign in
      if (!token) {
        navigate('/signin');
        return
      };
      //  axios put request for updates dislikes
      const response = await axios.put(
        `${config.URL}/video/${id}/dislikes`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // get video states 
        getvideoStates();
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  const getvideoStates = async () => {
    // if not sign in 
    if (!token) return;
    // axios get request for getting video states 
    try {
      const response = await axios.get(`${config.URL}/video/${id}/videostates`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      // get the likes and dislikes 
      setVideoStates({
        likes: data.likes,
        dislikes: data.dislikes
      })
      // get like and dislike status 
      setLikeStatus(response.data.likestate);
      setdisLikeStatus(response.data.dislikes);
    } catch (error) {
      console.log(error);
    }
  }
  // get video states when compnent mounts 
  useEffect(() => {
    if (token) {
      getvideoStates();
    }
  }, [])

  const UpdateViews = async () => {
    try {
      // axios put request for update views 
      await axios.put(`${config.URL}/video/${id}/views`);

    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateViews = (e) => {
    // Video current time
    const currentTime = e.target.currentTime;
    // Video duration
    const duration = e.target.duration;
    // Time increment: user watched time since last event
    const timeIncrement = currentTime - (e.target.previousTime || 0);
    // Set the previous time to the current time
    e.target.previousTime = currentTime;

    // Check if user is watching and not skipping
    if (timeIncrement > 0 && !seeking) {
      // Use a local variable to track watched time
      let watchedTime = (e.target.watchedTime || 0) + timeIncrement;
      e.target.watchedTime = watchedTime;

      // Check if the video is marked as watched
      if (!videoWatched && watchedTime >= duration / 2) {
        setVideoWatched(true);
        // Trigger view update
        UpdateViews();
      }
    }
  };


  const channelDetails = async () => {
    try {
      // axios get request for getting channel data 
      const response = await axios.get(`${config.URL}/channel/${videoChannelId}`)
      const data = response.data;
      setChannelData({
        channelName: data.ChannelName,
        pickUrl: data.PickUrl,
        subscribers: data.Subscribers
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // fetch the data when channel id available 
    if (videoChannelId) {
      channelDetails();
    }
  }, [videoChannelId])

  const getUserDetail = async () => {
    // if user not signin 
    if (!token || !videoChannelId) return;
    try {
      // axios get request for getting user details 
      const response = await axios.get(`${config.URL}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status == 200) {
        const data = response.data;
        // set the subscribed status of the user 
        setSubscribed(data.user.Subscriptions.includes(videoChannelId))
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleSubscribe = async () => {
    try {
      // if user not sign in 
      if (!token) {
        navigate('/signin');
        return
      }
      // axios put request for update subscription
      const response = await axios.put(`${config.URL}/user/subscriptions/${videoChannelId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSubscribers(response.data.subscribers);
      getUserDetail();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // get user data when signin 
    if (token && videoChannelId) {
      getUserDetail();
    }
  }, [token, videoChannelId]);


  return (
    <div
      className={`flex flex-col md:flex-row w-full h-full ${isOpen ? "lg:pl-[220px] sm:pl-[200px]" : "sm:pl-[100px]"
        }`}
    >
      {/* Left Section: Video Player, Description, and Comments */}
      <div className="w-full md:w-1/2 lg:3/5 lg:w-full lg:pr-4">
        {/* Video Player */}
        <div
          className={`w-full aspect-video ${isOpen ? "hidden sm:block" : ""
            } bg-black mb-4 md:aspect-[4/3] lg:aspect-[16/9]`}
        >
          <video
            src={video.videoUrl}
            controls
            poster={video.thumbnailUrl}
            className="w-full h-full"
            onTimeUpdate={(e) => handleUpdateViews(e)}
            onSeeking={() => setSeeking(true)}
            onSeeked={() => setSeeking(false)}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Description Section */}
        <div className="p-4 bg-gray-100 rounded-md shadow mb-4">
          <h1 className="lg:text-xl text-lg font-bold mb-2">{video.title}</h1>
          <div className="lg:flex justify-between">
            <div className="lg:flex items-center justify-between mb-3">
              <div>
                <img src={channelData.pickUrl} className="w-7 h-7 rounded-full hover:cursor-pointer"
                  onClick={() => handleChannel(video.channelId)} />
                <span
                  className="text-sm font-semibold cursor-pointer"
                  onClick={() => handleChannel(video.channelId)}
                >
                  {channelData.channelName}
                </span>
                <p className="text-xs text-gray-500">{subscribers != null ? subscribers : channelData.subscribers} subscribers</p>
              </div>
              {/* check user owns the channel  */}
              {!(channelId === video.channelId) && (
                <button className={`lg:px-4 lg:py-2 ${subscribed ? "bg-white text-black" : "bg-black text-white"} hover:bg-slate-400 rounded-full lg:ml-12 text-sm p-1 mt-2 lg:mt-0`}
                  onClick={handleSubscribe}>
                  {/* check subscribe status  */}
                  {subscribed ? "Subscribed" : "Subscribe"}
                </button>
              )}
            </div>
            <div className="flex items-center flex-wrap sm:flex-nowrap lg:space-x-4 md:space-x-2 mb-3 justify-between">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-black"
                onClick={likeVideo}
              >
                {/* check like satatus and visible suitable icon for this  */}
                {likeStatus ? <AiFillLike className="w-6 h-6" /> : <AiOutlineLike className="w-6 h-6" />}
                <span>{token ? videoStates.likes : video.likes}</span>
              </button>

              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-black"
                onClick={dislikeVideo}
              >
                {/* check dislike satatus and visible suitable icon for this  */}
                {dislikeStatus ? <BiSolidDislike className="w-6 h-6" /> : <BiDislike className="w-6 h-6" />}
                <span>{token ? videoStates.dislikes : video.dislikes}</span>
              </button>

              <button className="flex items-center space-x-1 text-gray-700 hover:text-black">
                <FaShare className="w-6 h-6" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-black">
                <MdFileDownload className="w-6 h-6" />
                <span>Download</span>
              </button>
              <button className="text-gray-700 hover:text-black">
                <IoIosMore className="w-6 h-6" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {video.views} views • {moment(video.timeStamp).fromNow()}
          </p>
          <p className="text-sm text-gray-800">{video.description}</p>
        </div>
        {/* comments of the video  */}
        <Comments id={id} />
      </div>

      {/* Right Section: Similar Videos */}
      <div className="md:w-1/2 w-full h-full">
        {/* similar category video */}
        <SimilarVideos
          loading={loading}
          videos={relatedVideos.filter((v) => v._id !== video._id)} // Filtered to exclude the current video
        />
      </div>
    </div>
  );
};

export default Videopage;
