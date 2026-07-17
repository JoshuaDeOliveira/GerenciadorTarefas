import { findLogs } from "../repository/logRepository.js";

export const getAllLogs = async (req, res) => {
    try {
        const results = await findLogs()

        res.status(200).json(results)
    } catch (error) {
        console.log(`Esse foi o erro encontrado: ${error}`)
        res.status(400).json({
            ErrorMessage: "Erro ao buscar os logs no banco de dados"
        })
    }
}