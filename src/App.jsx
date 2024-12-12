import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout'; // Main layout for the app

// Lazy-loaded components for route-based code splitting
const Home = lazy(() => import('./components/Home'));
const Error = lazy(() => import('./components/Error'));
const Signin = lazy(() => import('./components/Signin'));
const Signup = lazy(() => import('./components/Signup'));
const NotFound = lazy(() => import('./components/NotFound'));
const Search = lazy(() => import('./components/Search'));
const VideoPage = lazy(() => import('./components/Videopage'));
const CreateChannel = lazy(() => import('./components/CreateChannel'));
const Channel = lazy(() => import('./components/Channel'));
const UploadVideo = lazy(() => import('./components/UploadVideo'));
const Subscriptions = lazy(() => import('./components/Subscriptions'));

// Define the routes for the application
const router = createBrowserRouter(
  [
    {
      // Root path
      path: '/',
      element: <Layout />,
      // Wraps children with the main layout
      children: [
        {
          path: '/',
          element: (
            // Loading spinner for lazy-loaded components 
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
          errorElement: (
            <Suspense fallback={<div>Loading...</div>}>
              <Error />
            </Suspense>
          ),
        },
        {
          // Route for search results
          path: '/search/:searchText',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Search />
            </Suspense>
          ),
        },
        {
          // Route for a video page
          path: '/video/:id',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <VideoPage />
            </Suspense>
          ),
        },
        {
          // Route for creating a new channel
          path: '/channel/createchannel',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CreateChannel />
            </Suspense>
          ),
        },
        {
          // Route for update channel
          path: '/channel/updatechannel/:id',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CreateChannel isEditing={true} />
            </Suspense>
          ),
        },
        {
          // Route for channel page
          path: '/channel/:id',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Channel />
            </Suspense>
          ),
        },
        { // Route for uploading a new video
          path: '/video/uploadvideo/:id',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <UploadVideo />
            </Suspense>
          ),
        },
        { // Route for update video
          path: '/video/updatevideo/:id',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <UploadVideo isEditing={true} />
            </Suspense>
          ),
        },
        {
          // Route for subscriptions
          path: '/user/subscriptiondetails',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Subscriptions />
            </Suspense>
          ),
        },
      ],
      errorElement: (
        <Suspense fallback={<div>Loading...</div>}>
          <Error />
        </Suspense>
      ),
    },
    { // Route for the sign-in page
      path: '/signin',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Signin />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<div>Loading...</div>}>
          <Error />
        </Suspense>
      ),
    },
    { // Route for the sign-up page
      path: '/signup',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Signup />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<div>Loading...</div>}>
          <Error />
        </Suspense>
      ),
    },
    { // Catch-all route for undefined paths
      path: '*',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
      ),
    },
  ]
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
