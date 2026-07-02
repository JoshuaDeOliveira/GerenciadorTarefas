import express from 'express';
import poolconnect from '../connect.js'

const tasks_routes = express.Router()

tasks_routes.get('/tasks', async function (req, res) {
    try {
        const [results] = await poolconnect.execute(
            `SELECT * FROM tasks`
        )

        res.status(200).json(results)
    } catch (error){
        const results = {
            message: `Foi encontrado esse erro ${error}`,
            code: 500
        }

        res.status(results.code).send(results)
    }
})

export default tasks_routes

