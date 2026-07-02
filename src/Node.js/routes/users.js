import express from 'express';
import poolconnect from '../connect.js'

const user_routes = express.Router()

user_routes.get('/users', async function (req, res) {
    try {
        const [results] = await poolconnect.execute(
            'SELECT * FROM users'
        )

        res.status(200).json(results)
    } catch (error) {
        const results = {
            message: `Foi encontrado esse erro ${error}`,
            code: 500
        }

        res.status(results.code).send(results)
    }
})

user_routes.post('/registerusers', async function (req, res) {
    try {

        const nameuser = req.body.name
        const passworduser = req.body.password
        const emailuser = req.body.email

        const [response] = await poolconnect.execute(
            `INSERT INTO users(name_user, password_hash, email_user)
            VALUES(?,?,?)`,
            [nameuser, passworduser, emailuser]
        )

        const results = {
            message: "Usuario cadastrado com sucesso",
            code: 200
        }

        res.status(results.code).json(results)
    } catch (error) {
        const results = {
            message: `Foi encontrado esse erro ${error}`,
            code: 500
        }

        res.status(results.code).send(results)
    }
})

export default user_routes