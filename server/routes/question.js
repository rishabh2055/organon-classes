import { Router } from 'express';
import path from 'path';
const router = new Router();
const multer = require('multer');

import * as authReq from '../middlewares/authJWT';
import Question from '../controllers/question';
const UPLOAD_DIR = path.join(process.cwd(), 'client', 'src', 'assets', 'uploads');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});


router.post('/add', [authReq.verifyToken, upload.single('upload')], Question.addEditQuestion);
router.get('/all', [authReq.verifyToken], Question.getAllQuestions);
router.get('/:id', [authReq.verifyToken], Question.getQuestion);
router.get('/delete/:id', [authReq.verifyToken], Question.deleteQuestion);
router.get('/list/:id', Question.getAllQuestionList);
router.post('/byClassAndStream', [authReq.verifyToken], Question.getAllQuestionListByClassAndStream);

export default router;
