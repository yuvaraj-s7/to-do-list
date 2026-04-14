import { Router } from 'express';
import { chat } from '../controllers/chatController';
import { validate } from '../middleware/validate';
import { chatSchema } from '../validators/chatValidator';

const router = Router();
router.post('/', validate(chatSchema), chat);

export default router;
