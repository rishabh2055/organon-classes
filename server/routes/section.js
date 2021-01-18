import { Router } from 'express';
const router = new Router();

import Section from '../controllers/section';

router.post('/add', Section.addEditSection);
router.get('/all', Section.getAllSections);
router.get('/:id', Section.getSection);
router.get('/delete/:id', Section.deleteSection);
router.get('/list/:id', Section.getAllSectionList);

export default router;
