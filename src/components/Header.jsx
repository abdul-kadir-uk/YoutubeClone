import React, { useEffect, useState, useRef } from 'react';
import toggle from './../assets/img/toggle.png';
import youtube from './../assets/img/youtube.png';
import more from './../assets/img/more.png';
import user from './../assets/img/user.png';
import search from './../assets/img/search.png';
import voice from './../assets/img/microphone.png';
import { toggleSidebar } from '../redux/sidebarSlice';
import { Link } from 'react-router-dom';
import y_data_i from './../assets/img/y-data.png'
import appearance_i from './../assets/img/appearance.png'
import language_i from './../assets/img/language.png'
import restriction_i from './../assets/img/restriction.png'
import location_i from './../assets/img/location.png'
import keyboard_i from './../assets/img/keyboard.png'
import setting_i from './../assets/img/setting.png'
import help_i from './../assets/img/help.png'
import feedback_i from './../assets/img/feedback.png'
import create_video_i from './../assets/img/create_video.png'
import notification_i from './../assets/img/notification.png'
import y_studio_i from './../assets/img/y-studio.png'
import switch_account_i from './../assets/img/switch-account.png'
import google_i from './../assets/img/google.png'
import signout_i from './../assets/img/logout.png'
import purchase_i from './../assets/img/purchase.png'
import greater_i from './../assets/img/greater.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { logout } from '../redux/authSlice';
import { setChannelID } from '../redux/statesSlice';
import { setUserID } from '../redux/statesSlice';
import config from '../config';


const Header = () => {
  // state for toggle more options 
  const [showmore, setShowmore] = useState(false);
  // state for chacking channel existence 
  const [channelExist, setChannelExist] = useState(false);
  // state for user data - name and email
  const [userData, setUserData] = useState({
    name: "", email: ""
  })
  // state search input text 
  const [searchText, setSearchText] = useState("");
  // ref for he more menu 
  const moreMenuRef = useRef(null);
  //  get token from the local storage 
  const token = localStorage.getItem("token");
  // useDispatch for dispatching function 
  const dispatch = useDispatch();
  // when user logout remove token from localstorage 

  const channelId = useSelector((state) => state.IdStates.channelId);

  const handlelogout = () => {
    setShowmore(false);
    dispatch(logout());
  }
  //  get the user details 
  const getUserDetails = async () => {
    try {
      if (!token) return;
      const response = await axios.get(`${config.URL}/user/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const user = response.data.user;
      const channel = response.data.channelexist;
      dispatch(setUserID(user._id));
      // if channel exist 
      if (channel) {
        setChannelExist(true);
        dispatch(setChannelID(channel._id));
      }
      const userName = user.name.charAt(0).toUpperCase() + user.name.slice(1);
      setUserData({
        name: userName,
        email: user.email
      })
    } catch (error) {
      console.log(error);
    }
  }
  //  toggle more options 
  const handlemore = () => {
    setShowmore((prev) => !prev);
  }
  // if user click outside close more option menu 
  const handleClickOutside = (event) => {
    if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
      setShowmore(false);
    }
  };
  // get user details when component mounts 
  useEffect(() => {
    getUserDetails();
  }, [])

  useEffect(() => {
    if (channelId) {
      getUserDetails();
    }
  }, [channelId])
  // add event listner when component mounts and remove on umounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // usenavigate hook for navigation
  const navigate = useNavigate();
  // get search input 
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };
  //  navigate to search results page 
  const handlesearch = () => {
    if (searchText) {
      navigate(`/search/${searchText}`);
    }
    setSearchText("");
  }

  return (
    <header className="flex sm:flex-row flex-col md:justify-between items-center w-full md:p-4  ">
      {/* Toggle button and Brand Icon */}
      <div className="flex justify-between sm:justify-normal items-center md:w-1/4 sm:w-1/3 w-full sm:px-0 px-4 ">

        <div className=" rounded-full hover:bg-slate-300 cursor-pointer">
          <button className='sm:p-2' onClick={() => dispatch(toggleSidebar())}>
            <img src={toggle} alt="toggle" className="md:w-4 md:h-4 w-3 h-3" />
          </button>
        </div>
        <Link to={'/'}>
          <div className="md:ml-2 ml-1 flex items-center hover:cursor-pointer">
            <img src={youtube} alt="brand icon" className="w-4 h-4 md:w-8 md:h-8" />
            <h2 className="font-bold md:ml-1 text-sm md:text-xl ">Youtube <sup className="font-normal hidden sm:inline"> IN </sup></h2>
          </div>
        </Link>

      </div>

      {/* Search Section input field and button*/}
      <div className="flex items-center md:w-1/2 w-full mx-2">
        <div className="border-2 rounded-full border-black flex w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleInputChange}
            className="w-full md:p-1 md:pl-3 pl-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-l-full font-serif md:text-lg text-sm"
          />
          <img src={search} alt="search icon" className="md:w-8 w-6 cursor-pointer bg-slate-300 hover:bg-slate-100 rounded-r-full p-1"
            title="search" onClick={handlesearch} />
        </div>
        <div className="md:ml-3 ml-1">
          <img src={voice} alt="voice" className="md:w-8 md:h-8 w-6 h-6 bg-slate-300 hover:bg-slate-100 cursor-pointer md:p-2 p-1 rounded-full" title="search with your voice" />
        </div>
      </div>

      {/* More Options and Sign In */}
      <div className="hidden sm:flex items-center md:w-1/4 w-1/4 justify-end">
        {/* if sign in show upload video, notification options */}
        {token &&
          <div className='flex justify-between md:mr-5 mr-2'>
            <Link to={`${channelExist ? `/video/uploadvideo/${channelId}` : "/channel/createchannel"}`}>
              <div className='md:p-2 mr-5 hover:cursor-pointer hover:bg-slate-100 rounded-full'>
                <img src={create_video_i} alt="create" className='w-6 h-6 ' />
              </div>
            </Link>

            <div className='md:p-2 hover:cursor-pointer hover:bg-slate-100 rounded-full'>
              <img src={notification_i} alt="notification" className='w-6 h-6' />
            </div>
          </div>
        }
        <div className={`md:mr-3 mr-1  ${!token && "relative"}`} ref={moreMenuRef}>
          <button onClick={handlemore}>
            {/* if sign in show user name icon  */}
            {token ?
              <div className='rounded-full bg-green-900 text-white py-1 px-3'> {userData.name.charAt(0)} </div>
              :
              <img src={more} alt="more icon" className="md:w-6 md:h-6 w-4 h-4 cursor-pointer" title="settings" />
            }
          </button>
          {/* more options menu  */}
          {showmore && (<div className={`${token ? "md:right-16 right-0 top-7 md:top-0 mt-6 overflow-y-scroll h-5/6 md:w-80" : "right-0 mt-8"}  w-60 absolute  top-0 bg-white z-20 shadow `}>

            {token && <div>
              <div className='flex p-3'>
                <div className='j'>
                  <div className='rounded-full bg-green-900 text-white 
                py-1 px-3 flex justify-center items-center'>
                    <p > {userData.name.charAt(0)} </p>
                  </div>
                </div>
                {/* user details */}
                <div className='pl-2'>
                  <h2> {userData.name} </h2>
                  <p> {userData.email} </p>
                  <Link to={`${channelExist ? `/channel/${channelId}` : "/channel/createchannel"}`} onClick={() => setShowmore(false)}>
                    {/* check for channel existence */}
                    {channelExist ?
                      <p className='mt-2 text-blue-500 cursor-pointer'> View Channel</p> :
                      <p className='mt-2 text-blue-500 cursor-pointer'> Create Channel</p>
                    }
                  </Link>
                </div>
              </div>
              <hr />
              <div>

                <div className='py-1'>
                  <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
                    <img src={google_i} alt="data icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                    <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Google Account  </h2>
                  </div>
                  {/* navigate to sign in  */}
                  <Link to={'/signin'}>
                    <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100 relative'>
                      <img src={switch_account_i} alt="data icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                      <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Switch Account  </h2>
                      <img src={greater_i} alt="greater icon" className='w-5 h-5 absolute right-0 opacity-40' />
                    </div>
                  </Link>
                  {/* logout the user  */}
                  <div onClick={handlelogout} className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
                    <img src={signout_i} alt="data icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                    <h2 onClick={handlelogout} className='md:ml-4 ml-2 text-sm md:text-base'> Sign Out  </h2>
                  </div>
                </div>
                <hr />
                <div className='py-2'>
                  <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
                    <img src={y_studio_i} alt="data icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                    <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Youtube Studio  </h2>
                  </div>
                  <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
                    <img src={purchase_i} alt="data icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                    <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Purchases and memberships  </h2>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            }

            <div className='py-2'>
              <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
                <img src={y_data_i} alt="data icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Your data in Youtube  </h2>
              </div>

              <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100 relative'>
                <img src={appearance_i} alt="appearance icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Appearance: Device theme  </h2>
                <img src={greater_i} alt="greater icon" className='w-5 h-5 absolute right-0 opacity-40' />
              </div>

              <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100 relative'>
                <img src={language_i} alt="language icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Language: English  </h2>
                <img src={greater_i} alt="greater icon" className='w-5 h-5 absolute right-0 opacity-40' />
              </div>

              <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100 relative'>
                <img src={restriction_i} alt="restriction icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Restricted Mode: Off  </h2>
                <img src={greater_i} alt="greater icon" className='w-5 h-5 absolute right-0 opacity-40' />
              </div>

              <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100 relative'>
                <img src={location_i} alt="location icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Location: India  </h2>
                <img src={greater_i} alt="greater icon" className='w-5 h-5 absolute right-0 opacity-40' />
              </div>

              <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
                <img src={keyboard_i} alt="keyboard icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Keyboards shortcuts  </h2>
              </div>
            </div>

            <hr />
            <div className='py-1 pb-2'>
              <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
                <img src={setting_i} alt="setting icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
                <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Settings  </h2>
              </div>

            </div>

            <hr />
            <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
              <img src={help_i} alt="help icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
              <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Help  </h2>
            </div>

            <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
              <img src={feedback_i} alt="feedback icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
              <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Send Feedback  </h2>
            </div>

          </div>)}

        </div>
        {/* if not signin  */}
        {!token && (<div>
          <Link to={'/signin'}>
            <div className="md:border-2 border border-blue-500 rounded-full md:p-1 bg-white flex items-center cursor-pointer hover:bg-blue-100">
              <img src={user} alt="user icon" className="md:w-6 md:h-6 w-4 h-4 " />
              <h2 className="text-blue-500 md:ml-2 md:font-bold text-sm ">
                Sign In
              </h2>
            </div>
          </Link>
        </div>)}

      </div>
    </header>
  );
};

export default Header;
