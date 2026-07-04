import express from 'express';
import poolconnect from '../connect.js'

const user_routes = express.Router()
var results = {}

user_routes.get('/Users', async function (req, res) {
    try {
        [results] = await poolconnect.execute(
            'SELECT * FROM users'
        )

        res.status(200).json(results)
    } catch (error) {
        results = {
            message: `Foi encontrado esse erro ${error}`,
            code: 500
        }

        res.status(results.code).send(results)
    }
})

user_routes.post('/RegisterUser', async function (req, res) {
    try {
        const nameuser = req.body.name
        const passworduser = req.body.password
        const emailuser = req.body.email

        const [response] = await poolconnect.execute(
            `INSERT INTO users(name_user, password_hash, email_user)
            VALUES(?,?,?)`,
            [nameuser, passworduser, emailuser]
        )

        if (response.affectedRows > 0) {
            results = {
                message: "Usuario cadastrado com sucesso",
                code: 200
            }
        }
    } catch (error) {
         results = {
            message: `Foi encontrado esse erro ${error}`,
            code: 500
        }  
    }

    res.status(results.code).json(results)
})

user_routes.put('/UpdateUser', async function (req, res) {
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
            message: `foi encontrado esse erro na tentativa de atualizar o usuario ${error}`,
            code: 500
        }
    }

    res.status(results.code).json(results)
})

user_routes.delete('/DeleteUser', async function (req, res) {
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
            message: `Esse foi erro encontrado ${error}`,
            code: 500
        }
    }

    res.status(results.code).json(results)
})

export default user_routes