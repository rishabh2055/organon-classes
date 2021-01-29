import { Router } from 'express';
const router = new Router();

import * as authReq from '../middlewares/authJWT';
import Topic from '../controllers/topic';

router.post('/add', [authReq.verifyToken], Topic.addEditTopic);
router.get('/all', [authReq.verifyToken], Topic.getAllTopics);
router.get('/:id', [authReq.verifyToken], Topic.getTopic);
router.get('/delete/:id', [authReq.verifyToken], Topic.deleteTopic);
router.get('/list/:id', [authReq.verifyToken], Topic.getAllTopicList);
router.post('/byClassAndStream', [authReq.verifyToken], Topic.getAllTopicListByClassAndStream);

export default router;
