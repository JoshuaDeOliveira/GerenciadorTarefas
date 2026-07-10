import express from 'express';
import poolconnect from '../connect.js';

const log_route = express.Router()

log_route.get('/Logs', async function (req, res) {
    let results = {}

    try {
        const [response] = await poolconnect.execute(
            'SELECT * FROM log_operation'
        )

        results = {
            logs: response,
            code: 200
        }
    } catch (error) {
        results = {
            message: "Ocorreu um erro ao resgatar os logs, por favor verifique a conexão e tente novamente!",
            code: 404
        }

        console.log(`Esse foi o erro encontrado: ${error}`)
    }

    res.status(results.code).json(results)
})

export default log_route