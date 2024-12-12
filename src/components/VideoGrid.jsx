import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategory } from "../redux/similarVideosSlice";

const VideoGrid = ({ video }) => {
  // for navigation 
  const navigate = useNavigate();
  // for dispatching action 
  const dispatch = useDispatch();
  // to get time at which the video is upload 
  const videoDate = moment(video.timeStamp).fromNow();
  const handleClick = (id, category) => {
    // set the category 
    dispatch(setCategory(category));
    // navigate video page 
    navigate(`/video/${id}`);
  }

  const handleChannel = (e, channelId) => {
    // stop triggered parent click handler  
    e.stopPropagation();
    // navigate to channel page 
    navigate(`/channel/${channelId}`);
  }

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white cursor-pointer"
      onClick={() => handleClick(video._id, video.category)}>
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold line-clamp-2">{video.title}</h2>
        <p className="text-slate-800 text-sm font-semibold"
          onClick={(e) => handleChannel(e, video.channelId)}
        >{video.channelName}</p>
        <div className='flex space-x-4'>
          <p className="text-gray-600 text-sm">{video.views} views</p>
          <p className="text-gray-600 text-sm">{videoDate}</p>
        </div>

      </div>
    </div>
  );
};

export default VideoGrid;


