import { Router } from 'express';
const router = new Router();

import Stream from '../controllers/stream';

router.post('/add', Stream.addEditStream);
router.get('/all', Stream.getAllStreams);
router.get('/:id', Stream.getStream);
router.get('/delete/:id', Stream.deleteStream);
router.get('/list/:id', Stream.getAllStreamList);

export default router;
