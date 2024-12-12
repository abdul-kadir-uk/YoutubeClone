import Router from 'express'
import { getSearchVideos } from '../controller/video.controller.js';

const router = Router();

router.get("/:searchText", getSearchVideos);

export default router;