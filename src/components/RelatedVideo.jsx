import React from 'react';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

const RelatedVideo = ({ video }) => {
  const navigate = useNavigate();
  // navigat to the video page
  const redirectVideoPage = (id) => {
    navigate(`/video/${id}`);
  }
  //  navigate to the channel page 
  const redirectChannelPage = (e, id) => {
    e.stopPropagation();
    navigate(`/channel/${id}`);
  }

  return (

    <div className="flex space-x-4 hover:bg-gray-100 sm:p-2 p-1 rounded-lg cursor-pointer" onClick={() => redirectVideoPage(video._id)}>
      <div className="w-40 h-36 bg-gray-300 rounded-lg">
        <img src={video.thumbnailUrl} alt={video.title} className="object-cover w-full h-full" />
      </div>
      <div>
        <h3 className="font-serif text-lg line-clamp-2 w-[200px] sm:w-[300px] md:w-[200px]">{video.title}</h3>
        <p className="mt-1 font-semibold text-slate-400 text-sm"
          onClick={(e) => redirectChannelPage(e, video.channelId)}
        >{video.channelName}</p>
        <div className="flex space-x-2">
          <p className="text-sm text-gray-400">{video.views} Views</p>
          {/* get the time of video upload  */}
          <p className="text-sm text-gray-400">&bull; {moment(video.timeStamp).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default RelatedVideo;
