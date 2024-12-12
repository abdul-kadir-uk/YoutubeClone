import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const UploadVideo = ({ isEditing = false }) => {
  // redux state for sidebar
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  // get token from localstorage 
  const token = localStorage.getItem("token");
  // get channel id or video id from parameters 
  const { id } = useParams();
  // for navigation 
  const navigate = useNavigate();
  // channel id state 
  const [channelId, setChannelId] = useState("");
  // error state 
  const [error, setError] = useState(null);
  // loading state 
  const [loading, setLoading] = useState(false);
  // get form data from the user input 
  const [formData, setFormData] = useState({
    title: "",
    thumbnailUrl: "",
    videoUrl: "",
    description: "",
    category: "",
  });
  //  categories array 
  const categories = [
    "Sports",
    "News",
    "Entertainment",
    "Gaming",
    "Music",
    "Movies",
    "Arts",
    "Fashion",
    "Foods",
    "Vlogs",
    "Comedy",
    "Shopping",
    "Cartoons",
    "Education",
    "Health",
    "Programming",
    "Travels",
    "Motivations",
    "Other",
  ];

  const handleChange = (e) => {
    // take the name value from input 
    const { name, value } = e.target;
    // set the form data 
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // prevent default behaviour 
    e.preventDefault();
    try {
      // check request method 
      const Method = isEditing ? "put" : "post";
      // check endpoint 
      const Endpoint = isEditing ? `http://localhost:1000/video/updatevideo/${id}` :
        `http://localhost:1000/video/uploadvideo/${id}`
      // axios put/post request for updating and creating video 
      const response = await axios[Method](Endpoint,
        {
          title: formData.title,
          thumbnailUrl: formData.thumbnailUrl || "https://www.techsmith.com/blog/wp-content/uploads/2023/03/how-to-make-a-youtube-video.png",
          videoUrl: formData.videoUrl,
          description: formData.description,
          category: formData.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      // if video is successfully updated or created 
      if (response.status === 201 || response.status === 200) {
        // navigate to channel page 
        navigate(`/channel/${isEditing ? channelId : id}`);
        // clear the error 
        setError(null);
      }
    } catch (error) {
      // handle the error and dispay it
      setError(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  // Fetch video data when editing
  useEffect(() => {
    const fetchVideoData = async () => {
      if (isEditing) {
        setLoading(true);
        // get token from local storage 
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`http://localhost:1000/video/getvideo/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const video = response.data.video;
          // set form data 
          setFormData({
            title: video.title,
            thumbnailUrl: video.thumbnailUrl,
            videoUrl: video.videoUrl,
            description: video.description,
            category: video.category
          })
          // set channel id 
          setChannelId(video.channelId);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || "Failed to fetch channel data");
          setLoading(false);
          console.error(err);
        }
      }
    };

    fetchVideoData();
  }, [isEditing]);

  if (loading) {
    return <p className="text-center mt-4">Loading video data...</p>;
  }

  return (
    <div
      className={`${isOpen ? "lg:pl-[250px] sm:pl-[200px]" : "sm:pl-[100px]"
        } h-full pb-12 md:pb-24 overflow-y-auto w-full`}
    >
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">{isEditing ? "Update Video" : "upload video"}</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Video Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter video title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="thumbnailUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Video Thumbnail URL
          </label>
          <input
            type="url"
            id="thumbnailUrl"
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter thumbnail URL"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
            Video URL
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter video URL"
            required
          />
        </ div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter video description"
            rows="4"

          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="overflow-hidden mt-1 md:block w-full md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {isEditing ? "Update" : "Upload"}
        </button>
      </form>
      {error && <p className="text-center text-red-500"> {error} </p>}
    </div>
  );
};

export default UploadVideo;
