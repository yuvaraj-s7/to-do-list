import { Router } from 'express';
import { createTodo, deleteTodo, listTodos, updateTodo } from '../controllers/todoController';
import { validate } from '../middleware/validate';
import { todoCreateSchema, todoUpdateSchema } from '../validators/todoValidator';

const router = Router();
router.get('/', listTodos);
router.post('/', validate(todoCreateSchema), createTodo);
router.patch('/:id', validate(todoUpdateSchema), updateTodo);
router.delete('/:id', deleteTodo);

export default router;
