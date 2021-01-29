import { Router } from 'express';
const router = new Router();

import * as authReq from '../middlewares/authJWT';
import Stream from '../controllers/stream';

router.post('/add', [authReq.verifyToken], Stream.addEditStream);
router.get('/all', [authReq.verifyToken], Stream.getAllStreams);
router.get('/:id', [authReq.verifyToken], Stream.getStream);
router.get('/delete/:id', [authReq.verifyToken], Stream.deleteStream);
router.get('/list/:id', [authReq.verifyToken], Stream.getAllStreamList);

export default router;
