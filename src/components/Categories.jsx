import React, { useRef } from "react";
import less from './../assets/img/less.png';
import greater from './../assets/img/greater.png';

const Categories = ({ getHomeVideos, getCategoryVideos }) => {
  // useRef for getting the ref of categories container
  const scrollRef = useRef(null);

  // Scroll left categories container by 200px
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  };

  // Scroll right categories container by 200px
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  };


  return (
    <div className="flex overflow-x-auto relative items-center">
      {/* Left arrow for handling scroll left function */}
      <div className="bg-white cursor-pointer absolute lg:left-0 sm:left-3" onClick={scrollLeft}>
        <img src={less} alt="less icon" className="w-5" />
      </div>

      {/* Scrollable categories container */}
      <div ref={scrollRef} className="flex overflow-x-auto scrollbar-none mx-10">
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={getHomeVideos}><h3>All</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos('Sports')}><h3>Sports</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos('News')}><h3>News</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos('Entertainment')}><h3>Entertainment</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos('Gaming')}><h3>Gaming</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos('Music')}><h3>Music</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos('Movies')}><h3>Movies</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos('Arts')}><h3>Arts</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Fashion")}><h3>Fashion</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Foods")}><h3>Foods</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Vlogs")}><h3>Vlogs</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Comedy")}><h3>Comedy</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Shopping")}><h3>Shopping</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Cartoons")}><h3>Cartoons</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Education")}><h3>Education</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Health")}><h3>Health</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Programming")}><h3>Programming</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Travels")}><h3>Travels</h3></div>
        <div className="bg-slate-100 px-2 mx-4 cursor-pointer" onClick={() => getCategoryVideos("Motivations")}><h3>Motivations</h3></div>
      </div>

      {/* Right arrow for handling scroll right function  */}
      <div className="bg-white px-2 mx-4 cursor-pointer absolute right-0" onClick={scrollRight}>
        <img src={greater} alt="greater icon" className="w-5" />
      </div>
    </div>
  );
};

export default Categories;
