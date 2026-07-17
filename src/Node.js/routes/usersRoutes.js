import express from 'express';
import { getUsers, RegisterUser } from '../controllers/usersController.js';

const user_routes = express.Router()

user_routes.get('/Users', getUsers)

user_routes.post('/RegisterUser', RegisterUser)

user_routes.put('/UpdateUser', async function (req, res) {
    let results = {}

    try {
        const attname = req.body.newname
        const attpassword = req.body.newpassword
        const attemail = req.body.newemail
        const id_user = req.body.iduser

        const [response] = await poolconnect.execute(
            `UPDATE users SET name_user = ?, password_hash = ?, email_user = ?
            WHERE id_user = ?`, [attname, attpassword, attemail, id_user]
            /*Lembrete para mim mesmo do futuro, lembrar de colocar uma forma de o usuario escolher o que atualizar*/
        )
        
        if (response.affectedRows > 0) {
            results = {
                message: 'Usuario atualizado com sucesso',
                code: 200
            }
        }
    } catch (error) {
        results = {
            message: "Foi encontrado esse erro ao atualizar o usuario!",
            code: 500
        }

        console.log(`Esse foi o erro encontrado: ${error}`)
    }

    res.status(results.code).json(results)
})

user_routes.delete('/DeleteUser', async function (req, res) {
    let results = {}

    try {
        const iduser = req.query.id_user

        const [response] = await poolconnect.execute(
            'DELETE FROM users WHERE id_user = ?', [iduser]
        )

        if (response.affectedRows > 0) {
            results = {
                message: `Usuario foi deletado com sucesso!`,
                code: 200
            }
        } else {
            results = {
                message: `Nao foi possivel deletar usuario!`,
                code: 500
            }
        }
    } catch (error) {
        results = {
            message: `Esse foi erro encontrado ${error.message}`,
            code: 500
        }
    }

    res.status(results.code).json(results)
})

export default user_routes