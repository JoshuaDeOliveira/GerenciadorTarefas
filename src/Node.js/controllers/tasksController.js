import { findAllTasks, createTask , deleteTask, updateTask} from "../repository/tasksReposity.js";

export const getAllTasks = async (req, res) => {
    try {
        const results = await findAllTasks()

        res.status(200).json(results)
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao tentar pegar as tarefas: ${error}`)
        res.status(400).json(
            {
                ErrorMessage: "Erro ao pegar as tarefas do banco de dados"
            }
        )
    }
}

export const RegisterTask = async (req, res) => {
    try {
        const email_user = req.query.email_user
        const task_name = req.body.task_name
        const task_date = req.body.task_date

        const response = await createTask(email_user, task_name, task_date)

        res.status(200).json(response)
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao tentar pegar as tarefas: ${error}`)
        res.status(400).json(
            {
                ErrorMessage: "Erro ao registrar a tarefa! Verifique as informações e tente novamente"
            }
        )
    }
}

export const eraseTask = async (req, res) => {
    try {
        const idtasks = req.query.id_task
        const response = await deleteTask(idtasks)

        res.status(200).json(response)
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao deletar a task: ${error}`)
        res.status(400).json({
            MessageError: "Erro ao deletar a tarefa! Verifique as informações e tente novamente"
        })
    }
}

export const attTask = async (req, res) => {
    try {
        const idtask = req.query.id_task
        const new_taskname = req.body.new_name
        const new_taskdate = req.body.new_date

        const response = await updateTask(idtask, new_taskname, new_taskdate)

        res.status(200).json(response)
    } catch (error) {
        console.log(`Erro encontrado ao atualizar a tarefa: ${error}`)
        res.status(400).json({
            MessageError: "Erro ao atualizar a tarefa! Verifique as informações e tente novamente"
        })
    }
}

