import express from 'express';
import { getUsers, RegisterUser, UpdateUser, DeleteUser } from '../controllers/usersController.js';

const user_routes = express.Router()

user_routes.get('/Users', getUsers)

user_routes.post('/RegisterUser', RegisterUser)

user_routes.put('/UpdateUser', UpdateUser)

user_routes.delete('/DeleteUser', DeleteUser)

export default user_routes