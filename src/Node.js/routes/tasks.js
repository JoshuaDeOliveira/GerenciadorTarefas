import express from 'express';
import poolconnect from '../connect.js'

const tasks_routes = express.Router()
var results = {}

tasks_routes.get('/tasks', async function (req, res) {
    try {
        [results] = await poolconnect.execute(
            `SELECT * FROM tasks`
        )

        res.status(200).json(results)
    } catch (error){
        results = {
            message: `Foi encontrado esse erro ${error}`,
            code: 500
        }

        res.status(results.code).send(results)
    }
})

tasks_routes.post('/SendTask', async function (req, res) {
    try {
        const emailuser = req.query.email_user
        const taskname = req.body.task_name
        const taskdate = req.body.task_date

        const [user_id] = await poolconnect.execute(
            `SELECT id_user FROM users WHERE email_user = ?`, [emailuser]
        )
        const who_id = user_id[0].id_user

        const [response] = await poolconnect.execute(
            `INSERT INTO tasks(who_task, task_name, task_date)
            VALUES (?, ?, ?)`, [who_id, taskname, taskdate]
        )

        if (response.affectedRows > 0) {
            results = {
                message: 'Nova tarefa adicionada',
                code: 200
            }
        } else {
            results = {
                message: 'Tarefa não foi adicionada!',
                code: 500
            }
        }
    } catch (error) {
        results = {
            message: `Esse foi o erro encontrado: ${error}`,
            code: 500
        }
    }

    res.status(results.code).send(results)
})

tasks_routes.put('/UpdateTask', async function (req, res) {
    try {
        const idtask = req.query.id_task
        const iduser = req.query.id_user

        const [ListTasks] = await poolconnect.execute(
            'SELECT * FROM tasks WHERE who_task = ?', [iduser]
        )

        console.log(ListTasks)

        results = {
            message: 'Teste efetuado com sucesso',
            code: 200
        }
    } catch (error) {
        results = {
            message: `Esse foi o erro encontrado: ${error}`,
            code: 500
        }
    }

    res.status(results.code).json(results)
})

tasks_routes.delete('/DeleteTask', async function (req, res) {
    try {
        const idtasks = req.query.id_task 

        const [response] = await poolconnect.execute(
            'DELETE FROM tasks WHERE id_task = ?', [idtasks]
        ) 

        if (response.affectedRows > 0) {
            results = {
                message: 'Tarefa deletada!',
                code: 200
            }
        } else {
            results = {
                message: 'Não foi possivel deletar a tarefa!',
                code: 500
            }
        }
    } catch (error) {
        results = {
            message: `Esse foi o erro encontrado: ${error}`,
            code: 500
        }
    }

    res.status(results.code).json(results)
})

export default tasks_routes

