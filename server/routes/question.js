import { Router } from 'express';
import path from 'path';
const router = new Router();
const multer = require('multer');

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


router.post('/add', upload.single('upload'), Question.addEditQuestion);
router.get('/all', Question.getAllQuestions);
router.get('/:id', Question.getQuestion);
router.get('/delete/:id', Question.deleteQuestion);
//router.get('/list/:id', Question.getAllQuestionList);

export default router;
