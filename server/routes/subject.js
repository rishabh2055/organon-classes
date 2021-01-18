import { Router } from 'express';
const router = new Router();

import Subject from '../controllers/subject';

router.post('/add', Subject.addEditSubject);
router.get('/all', Subject.getAllSubjects);
router.get('/:id', Subject.getSubject);
router.get('/delete/:id', Subject.deleteSubject);
router.get('/list/:id', Subject.getAllSubjectList);

export default router;
