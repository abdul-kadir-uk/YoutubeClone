import Router from 'express'
import { CreateChannel, getChannel, updateChannel } from '../controller/Channel.controller.js';
import authMiddelware from '../controller/auth.controller.js';

const router = Router();
router.post('/createchannel', authMiddelware, CreateChannel);
router.get('/:id', getChannel);
router.put('/updatechannel', authMiddelware, updateChannel);


export default router;