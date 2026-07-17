import { findAllUsers, createUser } from "../repository/usersRepository.js";

export const getUsers = async (req, res) => {
    try {
        const response = await findAllUsers()

        res.status(200).json(response)
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao tentar visualizar os usuarios: ${error}`)
        res.status(400).json(
            {MessageSystem: 'Erro ao visualizar os usuarios, por favor tente novamente ou verifique a conexão com o banco'}
        )
    }
}

export const RegisterUser = async (req, res) => {
    try {
        const nameuser = req.body.name
        const passworduser = req.body.password
        const emailuser = req.body.email

        const response = await createUser(nameuser, passworduser, emailuser)

        res.status(200).json(response)
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao tentar visualizar os usuarios: ${error}`)
        res.status(400).json(
            {
                MessageError: 'Erro ao tentar criar um usuario! Tente novamente ou verifique as informações inseridas'
            }
        )
    }
    
}