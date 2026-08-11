import express from 'express';
import * as UserController from '../controllers/usersController.js';

const user_routes = express.Router()

user_routes.get('/Users', UserController.getUsers)

user_routes.post('/RegisterUser', UserController.RegisterUser)

user_routes.put('/UpdateUser', UserController.UpdateUser)

user_routes.delete('/DeleteUser', UserController.DeleteUser)

export default user_routes