import poolconnect from '../connect.js';

export const findLogs = async () => {
    try {
        const [logs] = await poolconnect.execute(
            'SELECT * FROM log_operation'
        )
        return logs
    } catch (error) {
        console.log(`Esse foi o erro encontrado ${error}`)
        throw new Error('Erro ao buscar logs no banco de dados')
    }
}

