# React + Vite 
# YouTube Clone

This is a **YouTube Clone Web Application** built with **React** and **Vite**. by using these application you can easily watch any video of your choice , you can upolad any video 
you can like, dislike videos and create channel and also subscribe channel for updates.

---

## Features

- Video grid to display content.
- Video page with the video information - title, description, views,channel, likes/dislikes , comment section and similar videos.
- Comments section for give the suggestion and feedback.
- you can likes and dislikes any video of your choice.
- sidebar for menu options quick access.
- responsive design.
- when you signin recommend videos of your choices
- filter videos by category
- search the videos and channel

---

## Prerequisites

Ensure you have the following installed on your system:
- **Node.js** 
- **MongoDB** (local or hosted)

---

## Tecnologies Used
### Frontend 
- **React.js + vite**:- For building a dynamic user interface and faster development.
- **React Router**:- For routing.
- **Tailwind CSS**:- for styling.

### Backend
- **Node.js**:- Server-side runtime.
- **Express.js**:- Framework for building RESTful APIs.
- **MongoDB**:- Database for storing  user, channel, and video data.
- **Mongoose**: ODM for defining and interacting with MongoDB schemas.

### ***Redux***:- For global state management.


## How to Set Up the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/abdul-kadir-uk/YoutubeClone.git
   ```

2. **Change directory to youtube clone** 
   ```bash
   cd YoutubeClone
   ```

3. **Install the required dependencies**
   ```bash
   npm install
   ```

4. **Open new terminal and move to backend**
   ```bash
   cd backend
   ```

5. **create .env file and gives these details**
   ```bash
   MONGODB_URI=YOUR_MONGODB_URI
   PORT=PORT_NUMBER
   SECRET_KEY=YOUR_SECRET_KEY
   ```

6. **install the required dependencies of backend**
   ```bash
   npm install
   ```

7. **Start the server**
   ```bash
   npm start
   ```

8. **Now In Previous Terminal Run The Application And Enjoy It**
    ```bash
    npm run dev
    ```