import { HttpError } from "../errors/HttpError"
import { UsersRepository } from "../repository/UsersRepository"

export class UsersService {
    static async ShowUsers() {
        return await UsersRepository.showUsers()
    }

    static async findUserById(id: number) {
        const user = await UsersRepository.findUserById(id)

        if(!user || user == null || user == undefined) {
            throw new HttpError(404, "Usuário não encontrado")
        } else {
            return user
        }
    }

    static async createUser(attribuites: {name: string, cpf: string, email: string, password: string}) {
        const {name, cpf, email, password} = attribuites
        
        if(!name || !cpf || !email || !password) {
            throw new HttpError(400, "Erro ao cadastrar usuário. Todos os dados são obrigatórios")
        } else {
            const newUser = await UsersRepository.createUser({name, cpf, email, password})
            return newUser
        }
    }

    static async deletedUser(id: number) {
        const userDeleted = await UsersRepository.deletedUser(id)

        if(!userDeleted) {
            throw new HttpError(404, "Usuário não encontrado")
        } else {
            return userDeleted
        }
    }
}