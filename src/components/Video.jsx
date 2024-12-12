import React from 'react';
import VideoGrid from './VideoGrid';

// Define the Video component, which takes `videos` and `loading` as props
const Video = ({ videos, loading }) => {

  return (
    // If not loading, render the videos in a responsive grid layout
    <>{loading ? <> Loading... </> :
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {videos.map((video) =>
          (<VideoGrid video={video} key={video._id} />)
        )}
      </div>
    }
    </>

  );
};

export default Video;
