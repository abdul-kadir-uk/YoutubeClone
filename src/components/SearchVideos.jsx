import React, { useEffect, useState } from "react";
import SearchVideoStructure from "./SearchStructure";
import axios from "axios";
import { useParams } from "react-router-dom";

const SearchVideos = () => {
  // take search text from parameters 
  const { searchText } = useParams();
  // video state for storing videos 
  const [videos, setVideos] = useState([]);

  const getSearchVideo = async () => {
    try {
      // axios get request for getting videos 
      const response = await axios.get(`http://localhost:1000/search/${searchText}`);
      const data = response.data.videos;
      if (response.status === 404) {
        setVideos([]);
      }
      // set video data 
      setVideos(data);
    } catch (error) {
      // Handle 404 error (No videos found)
      if (error.response && error.response.status === 404) {
        // Clear the videos state
        setVideos([]);
      } else {
        console.error("An error occurred:", error.message); // Log other errors
      }
    }
  };
  // refetch search videos when search text change 
  useEffect(() => {
    getSearchVideo();
  }, [searchText]);

  return (
    <div className="md:p-4 w-full">
      <h1 className="text-lg md:text-2xl font-bold mb-4 pl-3">Search Results</h1>
      {videos.length === 0 ? ( // Check if the videos array is empty
        <div className="text-center text-gray-500">
          No videos available for "{searchText}"
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {videos.map((video) => (
            <SearchVideoStructure key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchVideos;
