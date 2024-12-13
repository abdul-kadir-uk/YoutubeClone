import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Subscriptions = () => {
  // redux state for subscription 
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  // get token from local storage 
  const token = localStorage.getItem("token");
  // cahnnels satate   
  const [channels, setChannels] = useState([]);
  // for navigation 
  const navigate = useNavigate();

  const getChannels = async () => {
    try {
      // if user not signin 
      if (!token) return;
      // axios get request for getting channels 
      const response = await axios.get(`${config.URL}/user/subscriptiondetails`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status == 200) {
        setChannels(response.data.channels);
      }

    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  const handleChannel = (channelid) => {
    // navigate to the channel page 
    navigate(`/channel/${channelid}`);
  }
  //  get channels data when component mounts 
  useEffect(() => {
    getChannels();
  }, [])

  return (
    <>
      <div
        className={`${isOpen ? 'lg:pl-[270px] sm:pl-[200px]' : 'sm:pl-[100px]'
          }  h-full pb-12 md:pb-24 overflow-y-auto w-full`}
      >
        {channels.length != 0 ?
          // if channels is not empty 
          <div className='md:ml-8 ml-3'>
            <h1 className='my-5 text-2xl font-semibold'> Subscriptions </h1>
            {channels.map((channel, index) =>
            (<div className='flex flex-col mb-2 hover:cursor-pointer hover:bg-slate-100
            md:w-1/2 py-1 pl-1' key={channel._id} onClick={() => handleChannel(channel._id)}>
              <div className='flex space-x-4 items-center'>
                <p>{index + 1}.</p>
                <img src={channel.PickUrl} alt={channel.Name} className='w-8 h-8 object-cover rounded-full' />
                <p>{channel.ChannelName}</p>
              </div>
            </div>)
            )}
          </div> :
          // if no channels subscribe 
          <p className='p-1 mt-5 md:ml-5'> No Subscriptions available, Subscribes channels to get details</p>}

      </div >
    </>
  )
}

export default Subscriptions
