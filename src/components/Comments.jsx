import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineEdit, AiOutlineDelete, AiFillLike } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import moment from 'moment';
import { useSelector } from 'react-redux';
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Comments = ({ id }) => {
  // state for get comments 
  const [comments, setComments] = useState([]);
  // state for add new comments 
  const [newComment, setNewComment] = useState('');
  // state for identify comment  
  const [editCommentId, setEditCommentId] = useState(null);
  // state for update comment
  const [editCommentText, setEditCommentText] = useState('');
  // get token from local storage 
  const token = localStorage.getItem("token");
  // useNavigate hook for navigation
  const navigate = useNavigate();
  // get user id from the redux state 
  const userId = useSelector((state) => state.IdStates.userId);

  // get Comments
  const getComments = async () => {
    try {
      const response = await axios.get(`${config.URL}/video/${id}/comments`);
      if (response.status === 200) {
        const sortedComments = response.data.comments.sort(
          (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
        );
        setComments(sortedComments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };


  // Add Comment
  const handleAddComment = async () => {
    // if input field is impty 
    if (!newComment.trim()) return;
    // if user id not found navgate to signin page
    if (!token) {
      navigate('/signin');
      return;
    }
    try {
      // axios post request for add comment
      const response = await axios.post(
        `${config.URL}/video/${id}/comments`,
        {
          commentText: newComment,
          likes: 0,
          dislikes: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // when comment added refresh input field and fetch comments
      if (response.status === 201) {
        setNewComment('');
        getComments();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  // Update Comment
  const handleUpdateComment = async (commentId) => {
    // if update comment text is empty return it 
    if (!editCommentText.trim()) return;

    try {
      // axios post put request for update comment
      const response = await axios.put(
        `${config.URL}/video/${id}/comments`,
        {
          commentId: commentId,
          updatedText: editCommentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // when comment is updated successfully refresh the update comment text,comment id and get comments  
      if (response.status === 200) {
        setEditCommentId(null);
        setEditCommentText('');
        getComments();
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };


  // Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      // axios delete request to delete comment
      const response = await axios.delete(`${config.URL}/video/${id}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { commentId },
      });
      //  when a comment deleted refresh the comments 
      if (response.status === 200) {
        getComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // like comment 
  const likeComment = async (commentId) => {
    // if user is not sign in 
    if (!token) {
      navigate('/signin');
      return
    }
    try {
      // axios put request for update likes
      const response = await axios.put(`${config.URL}/video/${id}/comments/likes`, {
        commentId: commentId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // when liked refresh the comments
      if (response.status == 200) {
        getComments();
      }
    } catch (error) {
      console.error(error);
    }

  }

  // dislike comment 
  const dislikeComment = async (commentId) => {
    // if user is not signin 
    if (!token) {
      navigate('/signin');
      return
    }
    try {
      // axios put request for updates dislikes
      const response = await axios.put(`${config.URL}/video/${id}/comments/dislikes`, {
        commentId: commentId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // when disliked refresh comments 
      if (response.status == 200) {
        getComments();
      }
    } catch (error) {
      console.error(error);
    }
  }


  // refresh comment when video change 
  useEffect(() => {
    getComments();
  }, [id]);

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <h2 className="text-lg font-bold mb-4">Comments</h2>

      {/* Add Comment input*/}
      <div className="flex items-center space-x-4 mb-4 flex-wrap">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Comment
        </button>
      </div>

      {/* List of Comments */}
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className="mb-4 p-4 border-b">
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <div>
                  <CgProfile className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-semibold">{comment.userName}</p>
                  <p className="text-xs text-gray-500">{comment.commentText}</p>
                  <div className='flex space-x-2 items-center flex-wrap'>
                    <div className='flex space-x-2 items-center '>
                      {/* change icon acc to like status  */}
                      {comment.likesUserIds.includes(userId) ?
                        <AiFillLike className='w-4 h-4 hover:cursor-pointer'
                          onClick={() => likeComment(comment._id)} /> :
                        <AiOutlineLike className='w-4 h-4 hover:cursor-pointer'
                          onClick={() => likeComment(comment._id)} />
                      }
                      <p> {comment.likes} </p>
                    </div>
                    <div className='flex space-x-2 items-center '>
                      {/* change icon acc to dislike status  */}
                      {comment.dislikesUserIds.includes(userId) ?
                        <BiSolidDislike className='w-4 h-4 hover:cursor-pointer'
                          onClick={() => dislikeComment(comment._id)} /> :
                        <BiDislike className='w-4 h-4 hover:cursor-pointer'
                          onClick={() => dislikeComment(comment._id)} />
                      }
                      <p> {comment.dislikes} </p>
                    </div>
                    <button className='rounded-full p-1 hover:bg-slate-300 text-sm'>
                      reply
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm">{moment(comment.createdAt).fromNow()}</p>
                {/* Show buttons only if the user ID matches */}
                {userId === comment.userId && (
                  <>
                    <button
                      onClick={() => {
                        setEditCommentId(comment._id);
                        setEditCommentText(comment.commentText);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Edit the Comment */}
            {editCommentId === comment._id && (
              <div className="mt-2">
                <input
                  type="text"
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => handleUpdateComment(comment._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditCommentId(null)}
                    className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
