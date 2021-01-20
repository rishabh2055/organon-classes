import { Router } from 'express';
import path from 'path';
const router = new Router();

import User from '../controllers/user';
import {checkDuplicateMobileNoOrEmail} from '../middlewares/verifyUser';

router.post('/login', User.login);
router.post('/add', [checkDuplicateMobileNoOrEmail], User.addEditUser);
router.get('/all', User.getAllUsers);
router.get('/:id', User.getUser);
router.get('/delete/:id', User.deleteUser);

export default router;
