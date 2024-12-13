import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import config from '../config';

const CreateChannel = ({ isEditing = false }) => {
  // Redux state for sidebar
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  // navigation hook for navigation
  const navigate = useNavigate();
  // state for getting name input
  const [name, setName] = useState("");
  // state for pickurl input
  const [pickUrl, setPickUrl] = useState("");
  // state for description input
  const [description, setDescription] = useState("");
  // state for handle input 
  const [handle, setHandle] = useState("");
  // state for displaying error 
  const [error, setError] = useState(null);
  // state for handling loading 
  const [loading, setLoading] = useState(false);
  // get the channel id from the url parameters
  const { id } = useParams();

  // get channel data when editing
  useEffect(() => {
    const fetchChannelData = async () => {
      // Only fetch data if editing is true for updation
      if (isEditing) {
        setLoading(true);
        // get token from the local storage 
        const token = localStorage.getItem('token');
        try {
          // Make axios get request for getting existing channel data
          const response = await axios.get(`${config.URL}/channel/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const channel = response.data;
          // Set state with fetched channel data
          setName(channel.ChannelName || "");
          setPickUrl(channel.PickUrl || "");
          setDescription(channel.Description || "");
          setHandle(channel.Handle || "");
          setLoading(false);
        } catch (err) {
          // Handle error if fetching data fails
          setError(err.response?.data?.message || "Failed to fetch channel data");
          setLoading(false);
        }
      }
    };
    // Call the function to fetch data
    fetchChannelData();
  }, [isEditing]);  // Re-run the effect if editing status changes

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission
    e.preventDefault();
    // Get token from the local storage
    const token = localStorage.getItem('token');

    try {
      // check the request is for updataion or creation the channel
      const endpoint = isEditing
        ? `${config.URL}/channel/updatechannel`
        : `${config.URL}/channel/createchannel`;

      // HTTP method (PUT for update, POST for create)
      const method = isEditing ? "put" : "post";

      // Send the request to the server to create or update the channel
      const response = await axios[method](
        endpoint,
        {
          ChannelName: name,
          PickUrl: pickUrl || "https://images.indianexpress.com/2023/05/youtube-logo-featured.jpg",
          Description: description,
          Handle: handle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Navigate to the channel page if successfully  update the channel
      if (response.status === 200) {
        // clear the error 
        setError(null);
        navigate(`/channel/${id}`);
      }  // Navigate to the home page if successfully create the channel
      else if (response.status === 201) {
        // clear the error 
        setError(null);
        navigate(`/`);
        window.location.reload();
      }
    } catch (err) {
      // Handle errors during submission
      setError(err.response?.data?.message || err.message);
      console.error(err);
    }
  };

  // Display loading state while fetching channel data
  if (loading) {
    return <p className="text-center mt-4">Loading channel data...</p>;
  }

  return (
    <div
      className={`${isOpen ? 'lg:pl-[270px] sm:pl-[200px]' : 'sm:pl-[100px]'
        }  h-full pb-12 md:pb-24 w-full`}
    >
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">
          {/* title for update or create  */}
          {isEditing ? "Update Channel" : "Create Channel"}
        </h1>
        <form className="space-y-2" onSubmit={handleSubmit}>
          {/* Input for the Channel Name */}
          <div>
            <label className="block font-medium mb-2" htmlFor="channelName">
              Channel Name
            </label>
            <input
              id="channelName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}  // Update name on input change
              placeholder="Enter channel name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {/* Input for the Profile Picture URL */}
          <div>
            <label className="block font-medium mb-2" htmlFor="channelprofile">
              Profile Pic URL
            </label>
            <input
              id="channelprofile"
              type="text"
              value={pickUrl}
              onChange={(e) => setPickUrl(e.target.value)}  // Update pickUrl on input change
              placeholder="Enter Pick Url"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {/* Input for the Channel Handle */}
          <div>
            <label className="block font-medium mb-2" htmlFor="channelHandle">
              Create Channel ID
            </label>
            <input
              id="channelHandle"
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="Create Channel ID"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {/*Input for the Channel Description */}
          <div>
            <label className="block font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your channel"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              {/* button for update or create channel */}
              {isEditing ? "Update Channel" : "Create Channel"}
            </button>
          </div>
        </form>
        {/* Display error message if error occurs */}
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CreateChannel;
