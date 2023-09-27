import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTask, getTasks, createTask, deleteTask, updatedTask } from "../controllers/task.controllers.js";
import { validateSchema } from "../middlewares/validate.middlewares.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get('/task', authRequired, getTask);
router.get('/task/:id', authRequired, getTasks);
router.post('/task', authRequired, validateSchema(createTaskSchema), createTask);
router.delete('/task/:id', authRequired, deleteTask);
router.put('/task/:id', authRequired, updatedTask);


export default router;