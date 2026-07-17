import express from 'express';
import { getAllLogs } from '../controllers/logController.js';

const log_route = express.Router()

log_route.get('/Logs', getAllLogs)

export default log_route