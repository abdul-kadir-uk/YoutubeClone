import Router from 'express'
import { getvideos, updateVideo, uploadvideo, deletevideo, getvideo, getHomeVideos, get_videos_by_category, getVideoPage, updateviews } from '../controller/video.controller.js';
import authMiddelware from '../controller/auth.controller.js';
import { createComment, deleteComment, getComments, updateComment } from '../controller/comment.controller.js';
import { commentdisLikes, commentLikes, videoDisLikes, videoLikes, videoStates } from '../controller/likes.controller.js';

const router = Router();

router.post("/uploadvideo/:id", authMiddelware, uploadvideo);
router.get("/getvideo/:id", getvideo);
router.get("/getvideos/:id", getvideos);
router.put("/updatevideo/:id", authMiddelware, updateVideo);
router.delete("/deletevideo/:id", authMiddelware, deletevideo);
router.get("/gethomevideos", authMiddelware, getHomeVideos);
router.get("/category/:category", get_videos_by_category);
router.get("/:id", getVideoPage);

router.get("/:id/comments", getComments);
router.post("/:id/comments", authMiddelware, createComment);
router.put("/:id/comments", authMiddelware, updateComment);
router.delete("/:id/comments", authMiddelware, deleteComment);

router.put("/:id/likes", authMiddelware, videoLikes);
router.put("/:id/dislikes", authMiddelware, videoDisLikes);
router.get("/:id/videostates", authMiddelware, videoStates);
router.put("/:id/comments/likes", authMiddelware, commentLikes);
router.put("/:id/comments/dislikes", authMiddelware, commentdisLikes);
router.put('/:id/views', updateviews);

export default router;