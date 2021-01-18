import { Router } from 'express';
const router = new Router();

import classes from './class';
import stream from './stream';
import subject from './subject';
import topic from './topic';
import section from './section';
import question from './question';

router.use('/class', classes);
router.use('/stream', stream);
router.use('/subject', subject);
router.use('/topic', topic);
router.use('/section', section);
router.use('/question', question);

export default router;
