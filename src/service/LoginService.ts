import { UsersRepository } from "../repository/UsersRepository"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { HttpError } from "../errors/HttpError"
import dotenv from "dotenv"
dotenv.config()



export class LoginService {
    static async login(attributes: {email: string, password: string}) {
        const {email, password} = attributes
        const user = await UsersRepository.getEmail({email})

        if(!user) throw new HttpError(404, "Este usuário não existe")

        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            throw new HttpError(401, "Usuario ou senha inválidos")
        } else {

            const payload = {name: user.name, cpf: user.cpf}

            if(!process.env.JWT_KEY) throw new HttpError(404, "JWT_KEY não definida nas variáveis de ambiente")

            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h'})
            return {id: 201, msg: token}
        }

    }   
}