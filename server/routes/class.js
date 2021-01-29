import { Router } from 'express';
const router = new Router();

import * as authReq from '../middlewares/authJWT';
import Classes from '../controllers/class';

router.post('/add', [authReq.verifyToken], Classes.addEditClass);
router.get('/all', [authReq.verifyToken], Classes.getAllClasses);
router.get('/:id', [authReq.verifyToken], Classes.getClass);
router.get('/delete/:id', [authReq.verifyToken], Classes.deleteClass);

export default router;
