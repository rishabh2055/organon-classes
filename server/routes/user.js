import { Router } from 'express';
const router = new Router();

import User from '../controllers/user';
import * as authReq from '../middlewares/authJWT';
import {checkDuplicateMobileNoOrEmail} from '../middlewares/verifyUser';

router.post('/login', User.login);
router.post('/add', User.addEditUser);
router.get('/all', [authReq.verifyToken], User.getAllUsers);
router.get('/:id', [authReq.verifyToken], User.getUser);
router.get('/delete/:id', [authReq.verifyToken], User.deleteUser);

export default router;
