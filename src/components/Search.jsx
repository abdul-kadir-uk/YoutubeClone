import React from "react";
import { useSelector } from "react-redux";
import SearchVideos from "./Searchvideos";
// Search page component
const Search = () => {
  //  redux state for sidebar visibility 
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  return (
    <div
      className={`${isOpen ? 'lg:pl-[270px] sm:pl-[200px]' : 'sm:pl-[100px]'
        }  h-full pb-12 md:pb-24 overflow-y-auto w-full`}
    >
      <SearchVideos />
    </div >
  )
}


export default Search;