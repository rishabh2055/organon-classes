import { Router } from 'express';
const router = new Router();

import Classes from '../controllers/class';

router.post('/add', Classes.addEditClass);
router.get('/all', Classes.getAllClasses);
router.get('/:id', Classes.getClass);
router.get('/delete/:id', Classes.deleteClass);

export default router;
