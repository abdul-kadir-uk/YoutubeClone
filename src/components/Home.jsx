import React from "react";
import Categories from "./Categories";
import Video from "./Video";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const Home = () => {
  // redux state for sidebar
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  // state for videos 
  const [videos, setVideos] = useState([]);
  // get token 
  const token = localStorage.getItem("token");
  // state for loading 
  const [loading, setLoading] = useState(false);
  //  get home vidoes by user choice 
  const getHomeVideos = async () => {
    if (!token) return;
    try {
      setLoading(true);
      // axios get request for get home videos 
      const response = await axios.get(`${config.URL}/video/gethomevideos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setLoading(false);
        setVideos(data);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  // get videos by category 
  const getCategoryVideos = async (category) => {
    if (!token) return;
    try {
      // axios get request for get video by category 
      const response = await axios.get(`${config.URL}/video/category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setVideos(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //  get home videos when component mounts 
  useEffect(() => {
    getHomeVideos();
  }, []);


  return (
    <>
      {
        // if user is signin 
        token ? (
          // layout for open and close sidebar 
          <div
            className={`${isOpen ? 'lg:pl-[270px] sm:pl-[200px]' : 'sm:pl-[100px]'
              }  h-full pb-12 md:pb-24`}
          >
            {/* categories component  */}
            <div className={`my-4 ${isOpen ? 'hidden sm:block' : 'block'}`}>
              <Categories getHomeVideos={getHomeVideos} getCategoryVideos={getCategoryVideos} />
            </div>
            {/* video component  */}
            <Video videos={videos} loading={loading} />
          </div>
        ) : (
          // if user is not sign in 
          <div className={`${isOpen ? 'hidden sm:block' : 'block'}`}>
            <div className="absolute ml-2 sm:left- sm:top-20 sm:right-20 lg:top30 lg:right-80" >
              <h2 className="font-bold text-xl"> search to get videos  </h2>
              <p className="text-lg"> signin to get recommended videos </p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Home;