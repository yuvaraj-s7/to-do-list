import { Router } from 'express';
import { createEvent, deleteEvent, listEvents, updateEvent } from '../controllers/eventController';
import { validate } from '../middleware/validate';
import { eventCreateSchema } from '../validators/eventValidator';

const router = Router();
router.get('/', listEvents);
router.post('/', validate(eventCreateSchema), createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
