import express from 'express';
import poolconnect from '../connect.js'

const tasks_routes = express.Router()

tasks_routes.get('/Tasks', async function (req, res) {
    let results = {}

    try {
        [results] = await poolconnect.execute(
            `SELECT * FROM tasks`
        )

        res.status(200).json(results)
    } catch (error){
        results = {
            message: `Foi encontrado esse erro ${error.message}`,
            code: 500
        }

        res.status(results.code).json(results)
    }
})

tasks_routes.post('/RegisterTask', async function (req, res) {
    let results = {}

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
            message: "Foi encontrado um erro ao registrar a tarefa",
            code: 500
        }

        console.log(`Esse foi o erro encontrado: ${error}`)
    }

    res.status(results.code).json(results)
})

tasks_routes.put('/UpdateTask', async function (req, res) {
    let results = {}

    try {
        const idtask = req.query.id_task
        const new_taskname = req.body.new_name
        const new_taskdate = req.body.new_date

        const [response] = await poolconnect.execute(
            `UPDATE tasks
            SET task_name = ?, task_date = ?
            WHERE id_task = ?`, [new_taskname, new_taskdate, idtask]
        )

        if (response.affectedRows > 0) {
            if (response.changedRows == 0) {
                results = {
                    message: 'Informações inseridas são identicas as registradas, verifique as informações e tente novamente!',
                    code: 200
                }
                return;
            } else {
                results = {
                    message: 'Tarefa atualizada com sucesso',
                    code: 200
                }
            }
        } else {
            results = {
                message: 'Tarefa não encontrada, verifique as informações e tente novamente!',
                code: 400
            }
        }
    } catch (error) {
        results = {
            message: "Erro ao atualizar as informações da tarefa",
            code: 500
        }

        console.log(`Esse foi o erro encontrado: ${error}`)
    }

    res.status(results.code).json(results)
})

tasks_routes.delete('/DeleteTask', async function (req, res) {
    let results = {}

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
            message: "Erro ao deletar a tarefa!",
            code: 500
        }

        console.log(`Esse foi o erro encontrado: ${error}`)
    }

    res.status(results.code).json(results)
})

export default tasks_routes

