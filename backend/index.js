import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import Connection from './connection.js';
import signup_routes from './routes/signup.routes.js'
import signin_routes from './routes/signin.routes.js'
import authMiddelware from './controller/auth.controller.js';
import userDetails_routes from './routes/userDetails.routes.js'
import Channel_routes from './routes/channel.routes.js'
import video_routes from './routes/video.routes.js'
import search_routes from './routes/searchvideo.routes.js'

// Initializing the express application
const app = express();
// Loading environment variables from a .env file
config();
// connect to the MongoDB database
Connection();

const port = process.env.PORT || 1000;
// Middleware for parsing JSON data in incoming requests
app.use(express.json());
// Middleware to enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Starting the server and listening for requests on the defined port
app.listen(port, () => {
  console.log("server is running on the port", port);
})

// Setting up route handlers for various endpoints
app.use('/signup', signup_routes);
app.use('/signin', signin_routes);
app.use('/user', authMiddelware, userDetails_routes);
app.use('/channel', Channel_routes);
app.use('/video', video_routes);
app.use('/search', search_routes);

