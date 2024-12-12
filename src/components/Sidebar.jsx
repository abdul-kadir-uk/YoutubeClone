import React from 'react';
import home_icon from './../assets/img/home.png'
import shorts_icon from './../assets/img/shorts.png'
import subscription_icon from './../assets/img/subscribe.png'
import user_icon from './../assets/img/user.png'
import history_icon from './../assets/img/history.png'
import trending_i from './../assets/img/trending.png'
import shopping_i from './../assets/img/shopping.png'
import music_i from './../assets/img/music.png'
import films_i from './../assets/img/films.png'
import live_i from './../assets/img/live.png'
import game_i from './../assets/img/game.png'
import news_i from './../assets/img/news.png'
import sport_i from './../assets/img/sport.png'
import courses_i from './../assets/img/courses.png'
import fashion_i from './../assets/img/fashion.png'
import podcast_i from './../assets/img/podcast.png'
import youtube_i from './../assets/img/youtube.png'
import y_music_i from './../assets/img/y-music.png'
import y_kids_i from './../assets/img/y-kids.png'
import settings from './../assets/img/setting.png'
import report from './../assets/img/report.png'
import help from './../assets/img/help.png'
import feedback from './../assets/img/feedback.png'

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/sidebarSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  // redux state for sidebar 
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  // redux state for channel id 
  const channelId = useSelector((state) => state.IdStates.channelId);
  // usedispatch for dispatch function 
  const dispatch = useDispatch();
  // useNavigate hook for navigation 
  const navigate = useNavigate();
  // get token from the local storage 
  const token = localStorage.getItem("token");

  const handleHome = () => {
    // navigate to home 
    navigate('/');
    // toggle the sidebar state 
    dispatch(toggleSidebar());
  }

  const handleSubscription = () => {
    // if token not found 
    if (!token) {
      navigate('/signin');
      return;
    }
    // navigate to the subscription page 
    navigate('/user/subscriptiondetails')
    // toggle the sidebar 
    dispatch(toggleSidebar());
  }

  const handleprofile = () => {
    // if channel not found 
    if (channelId) {
      // navigate to the channel page 
      navigate(`/channel/${channelId}`);
      // toggle sidebar 
      dispatch(toggleSidebar());
      return
    }
    // navigate to signin page 
    navigate('/signin');
  }

  return (
    <div className='flex'>
      {/* toggle of screen  */}
      <div className={`h-full flex flex-col justify-center items-center ml-1 
        ${isOpen ? 'hidden' : 'hidden sm:block'}`}>
        <div className='mt-4'>
          <Link to={'/'}>
            <div className='flex flex-col justify-center items-center hover:cursor-pointer hover:bg-slate-100 py-4'>
              <img src={home_icon} alt="home icon" className='w-7 h-7 p-1' />
              <h3 className='text-sm'> home </h3>
            </div>
          </Link>

          <div className='flex flex-col justify-center items-center  hover:cursor-pointer hover:bg-slate-100 py-4'>
            <img src={shorts_icon} alt="shorts icon" className='w-7 h-7 p-1' />
            <h3 className='text-sm'> shorts </h3>
          </div>
          <Link to={token ? "/user/subscriptiondetails" : "/signin"}>
            <div className='flex flex-col justify-center items-center
           hover:cursor-pointer hover:bg-slate-100 py-4'>
              <img src={subscription_icon} alt="subscription icon" className='w-7 h-7 p-1' />
              <h3 className='text-sm'> subscriptions </h3>
            </div>
          </Link>

          <Link to={channelId ? `/channel/${channelId}` : `/signin`}>
            <div className='flex flex-col justify-center items-center  hover:cursor-pointer hover:bg-slate-100 py-4'>
              <img src={user_icon} alt=" icon" className='w-7 h-7 p-1' />
              <h3 className='text-sm'> you </h3>
            </div>
          </Link>

          <div className='flex flex-col justify-center items-center  hover:cursor-pointer hover:bg-slate-100 py-4'>
            <img src={history_icon} alt="history icon" className='w-7 h-7 p-1' />
            <h3 className='text-sm'> history </h3>
          </div>
        </div>
      </div>

      {/* toggle on screen */}
      <div className={`border-2  h-screen overflow-y-scroll 
        ${isOpen ? 'sm:w-1/2 block bg-white pb-12 md:pb-20 z-30' : 'hidden'}`}>

        <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'
          onClick={handleHome}>
          <img src={home_icon} alt="home icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
          <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Home </h2>
        </div>

        <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
          <img src={shorts_icon} alt="shorts icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
          <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Shorts </h2>
        </div>
        <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'
          onClick={handleSubscription}>
          <img src={subscription_icon} alt="subscription icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
          <h2 className='md:ml-4 ml-2 text-sm md:text-base'
          > Subscriptions </h2>
        </div>
        <hr />

        <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'
          onClick={handleprofile}>
          <img src={user_icon} alt="user icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
          <h2 className='md:ml-4 ml-2 text-sm md:text-base'> You </h2>
        </div>


        <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
          <img src={history_icon} alt="history icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
          <h2 className='md:ml-4 ml-2 text-sm md:text-base'> History </h2>
        </div>
        <hr />

        {!token && <div className='p-2 ml-4 lg:ml-6'>
          <p className='text-sm md:text-base'>Sign in to like videos, comment and subscribe.</p>
          <Link to={'/signin'}>
            <div className='flex justify-center items-center w-20 h-12 border rounded-full cursor-pointer hover:bg-blue-100'>
              <img src={user_icon} alt="user" className='md:w-6 md:h-6 w-5 h-5' />
              <h3 className='text-sm ml-1 text-blue-500'> sign in </h3>
            </div>
          </Link>

        </div>}
        <hr />
        <div>
          <h1 className='font-bold ml-4 p-1'> Explore </h1>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={trending_i} alt="Trending icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Trending </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={shopping_i} alt="shopping icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Shopping </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={music_i} alt="music icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Music </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={films_i} alt="film icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Films </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={live_i} alt="live icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Live </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={game_i} alt="gaming icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Gaming </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={news_i} alt="news icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> News </h2>
          </div>

          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={sport_i} alt="sport icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Sports </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={courses_i} alt="courses icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Courses </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={fashion_i} alt="fashion icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Fashion & beauty </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={podcast_i} alt="podcast icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Podcasts </h2>
          </div>
        </div>
        <hr />
        <div>
          <h1 className='font-bold ml-4 p-1'> More from Youtube </h1>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={youtube_i} alt="youtube icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Youtube Premium </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={y_music_i} alt="youtube music  icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Youtube Music </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={y_kids_i} alt="youtube kids icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Youtube Kids </h2>
          </div>
        </div>
        <hr />
        <div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={settings} alt="settings icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Settings </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={report} alt="Report icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Report History </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={help} alt="help icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Help </h2>
          </div>
          <div className='h-10 p-1 flex items-center cursor-pointer hover:bg-slate-100'>
            <img src={feedback} alt="Feedback icon" className='md:w-6 md:h-6 w-5 h-5 ml-2 lg:ml-6' />
            <h2 className='md:ml-4 ml-2 text-sm md:text-base'> Send Feedback </h2>
          </div>
        </div>
        <hr />
        <div>
          <p className='p-2 lg:px-4 text-sm'>About Press Copyright Contact us Creator Advertise Developers </p>
          <p className='p-2 lg:px-4 text-sm'> TermsPrivacyPolicy & SafetyHow YouTube worksTest new features </p>
          <p className='p-2 lg:px-4 text-sm'> © 2024 Google LLC </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
