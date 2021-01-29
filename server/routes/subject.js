import { Router } from 'express';
const router = new Router();

import * as authReq from '../middlewares/authJWT';
import Subject from '../controllers/subject';

router.post('/add', [authReq.verifyToken], Subject.addEditSubject);
router.get('/all', [authReq.verifyToken], Subject.getAllSubjects);
router.get('/:id', [authReq.verifyToken], Subject.getSubject);
router.get('/delete/:id', [authReq.verifyToken], Subject.deleteSubject);
router.get('/list/:id', [authReq.verifyToken], Subject.getAllSubjectList);

export default router;
