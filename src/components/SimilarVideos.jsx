import React from 'react';
import RelatedVideo from './RelatedVideo';

const SimilarVideos = ({ loading, videos }) => {

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full overflow-y-auto">
      <h2 className="text-lg mb-4">Similar Videos</h2>
      {/* when videeos are fetching  */}
      {loading ? (
        <>Loading ...</>
      ) : (
        <>
          {/*  when no videos are found */}
          {!videos.length && <p>No similar videos found.</p>}
          <div className="flex flex-col gap-2">
            {videos.map((video) => (
              <RelatedVideo key={video._id} video={video} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SimilarVideos;
