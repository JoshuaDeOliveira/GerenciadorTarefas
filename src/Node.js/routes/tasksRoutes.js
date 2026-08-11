import express from 'express';
import * as taskController from '../controllers/tasksController.js';

const tasks_routes = express.Router()

tasks_routes.get('/Tasks', taskController.getAllTasks)

tasks_routes.post('/RegisterTask', taskController.RegisterTask)

tasks_routes.delete('/DeleteTask', taskController.eraseTask)

tasks_routes.put('/UpdateTask', taskController.attTask)

export default tasks_routes

