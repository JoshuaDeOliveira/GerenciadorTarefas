import poolconnect from '../connect.js'

export const findAllUsers = async () => {
    try {
        const [logs] = await poolconnect.execute(
            'SELECT * FROM users'
        )
        return logs 
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao tentar visualizar os usuarios: ${error}`)
        throw new Error('Erro na hora de consultar usuarios no banco de dados')
    }
}

export const createUser = async (nameuser, passworduser, emailuser) => {
    try {
        const [response] = await poolconnect.execute(
            `INSERT INTO users(name_user, password_hash, email_user)
            VALUES(?,?,?)`,
            [nameuser, passworduser, emailuser]
        )

        if (response.affectedRows === 0) {
            throw new Error('Não foi possivel criar um novo usuario! Por favor verifique as informações e tente novamente')
        }

        return {
            MessageSystem: "Usuario Cadastrado com sucesso!"
        }
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao tentar visualizar os usuarios: ${error}`)
        throw new Error('Erro na hora de criar um novo usuario!')
    }
}

