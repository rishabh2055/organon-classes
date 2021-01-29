import { Router } from 'express';
const router = new Router();

import * as authReq from '../middlewares/authJWT';
import Section from '../controllers/section';

router.post('/add', [authReq.verifyToken], Section.addEditSection);
router.get('/all', [authReq.verifyToken], Section.getAllSections);
router.get('/:id', [authReq.verifyToken], Section.getSection);
router.get('/delete/:id', [authReq.verifyToken], Section.deleteSection);
router.get('/list/:id', [authReq.verifyToken], Section.getAllSectionList);

export default router;
