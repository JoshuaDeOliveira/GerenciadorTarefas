import express from 'express';
import { getAllTasks, RegisterTask, eraseTask, attTask } from '../controllers/tasksController.js';

const tasks_routes = express.Router()

tasks_routes.get('/Tasks', getAllTasks)

tasks_routes.post('/RegisterTask', RegisterTask)

tasks_routes.delete('/DeleteTask', eraseTask)

tasks_routes.put('/UpdateTask', attTask)

export default tasks_routes

