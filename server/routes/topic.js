import { Router } from 'express';
const router = new Router();

import Topic from '../controllers/topic';

router.post('/add', Topic.addEditTopic);
router.get('/all', Topic.getAllTopics);
router.get('/:id', Topic.getTopic);
router.get('/delete/:id', Topic.deleteTopic);
router.get('/list/:id', Topic.getAllTopicList);

export default router;
