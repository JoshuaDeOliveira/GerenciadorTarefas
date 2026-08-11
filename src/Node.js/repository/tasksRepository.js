import poolconnect from '../connect.js'

export const findAllTasks = async () => {
    try {
        const [logs] = await poolconnect.execute(
            'SELECT * FROM tasks'
        )
        return logs
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao pegar as tarefas: ${error}`)
        throw new Error('Erro ao buscar as tasks no banco do dados');
    }
}

export const createTask = async (emailuser, taskname, taskdate) => {
    try {
        const [user_id] = await poolconnect.execute(
            `SELECT id_user FROM users WHERE email_user = ?`, [emailuser]
        )
        const who_id = user_id[0].id_user

        const [response] = await poolconnect.execute(
            `INSERT INTO tasks(who_task, task_name, task_date)
            VALUES (?, ?, ?)`, [who_id, taskname, taskdate]
        )

        if (response.affectedRows === 0) {
            throw new Error('Erro ao registrar a tarefa, verifique a informação')
        } else {
            return {
                MessageSystem: 'Tarefa adicionada com sucesso!'
            }
        }
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao registrar a tarefa: ${error}`)
        throw new Error('Erro ao registrar a tarefa!')
    }
}

export const deleteTask = async (idtask) => {
    try {
        const [response] = await poolconnect.execute(
            'DELETE FROM tasks WHERE id_task = ?', [idtask]
        ) 

        if (response.affectedRows === 0) {
            throw new Error('Nenhuma tarefa foi deletada! Verifique as informações e tente novamente!')
        } else {
            return {
                MessageSystem: 'Tarefa deletada com sucesso'
            }
        }
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao deletar a task: ${error}`)
        throw new Error('Erro ao deletar a tarefa')
    }
}

export const updateTask = async (idtask, newname, newdate) => {
    try {
        const [response] = await poolconnect.execute(
            `UPDATE tasks
            SET task_name = ?, task_date = ?
            WHERE id_task = ?`, [newname, newdate, idtask]
        )

        if (response.affectedRows === 0) {
            throw new Error('Não foi possivel atualizar a tarefa! Verifique as informações e tente novamente!')
        } 

        if (response.changedRows === 0) {
            return {
                MessageSystem: 'Informações inseridas são identicas as registradas, verifique as informações inseridas'
            }
        }

        return {
            MessageSystem: "Tarefa atualizada com sucesso!"
        }
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao atualizar a tarefa: ${error}`)
        throw new Error('Erro ao atualizar tarefa! Verifique as informações e tente novamente')
    }
}

export const findExistTask = async (user_id, task_date, task_name) => { /*Finalizar Feature de analisar a task*/
    try {
        
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao analisar a tarefa: ${error}`)
        throw new Error('Erro ao analisar se a tarefa ja existe para o usuario selecionado')
    }
}