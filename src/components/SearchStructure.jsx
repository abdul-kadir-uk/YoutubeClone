import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/similarVideosSlice";

const SearchVideoStructure = ({ video }) => {
  // useNavigate hook for navigation
  const navigate = useNavigate();
  // usedispatch hook for dispatching function
  const dispatch = useDispatch();

  // destructuring the video 
  const { _id, thumbnailUrl, title, views, timeStamp,
    channelName, description, category } = video;
  const handleclick = () => {
    // set the category 
    dispatch(setCategory(category));
    // navigate to the video page 
    navigate(`/video/${_id}`);
  }

  const handleChannel = (e, channelId) => {
    // stop the parent handler to triggered
    e.stopPropagation();
    // navigate to channel page 
    navigate(`/channel/${channelId}`);
  }

  return (
    <div className="flex flex-col md:flex-row border-b pb-4 hover:cursor-pointer" onClick={handleclick}>
      {/* Thumbnail */}
      <div className="md:w-4/5 w-full">
        <img
          src={thumbnailUrl}
          alt={title}
          className="object-fill md:object-cover rounded-md h-72 p-2 w-full"
        />
      </div>
      {/* Video Details */}
      <div className="px-2 md:pl-0 flex flex-col md:block md:w-3/4 md:pt-1">
        <h2 className="text-lg md:text-xl font-semibold mb-1 line-clamp-2">
          {title}
        </h2>
        <div className="flex md:block justify-between">
          <p className="text-sm text-gray-500  md:inline order-2 md:order-1  md:px-0">
            {views} views
          </p>
          <p className="order-3 text-gray-500 md:inline md:ml-5">&bull;&nbsp;{moment(timeStamp).fromNow()}</p>
          <p className="text-gray-500 pb-4 font-bold inline
           md:block order-1 md:order-2 md:mt-2"
            onClick={(e) => handleChannel(e, video.channelId)}>
            {channelName}
          </p>
          {/* Corrected line-clamp usage */}
          <p
            className="text-sm font-semibold text-gray-500 md:block hidden md:w-[400px]
            lg:w-full">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchVideoStructure;
