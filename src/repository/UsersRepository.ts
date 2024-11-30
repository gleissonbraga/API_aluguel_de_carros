
import { db_connect, db_endConnection, db_query, db_query_params } from "../config/db"

import bcrypt from "bcrypt"


interface UsersAttribuites {
    name: string,
    cpf: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

export class UsersRepository {
    name: string
    cpf: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date

    constructor(attribuites: UsersAttribuites) {
        this.name = attribuites.name
        this.cpf = attribuites.cpf
        this.email = attribuites.email
        this.password = attribuites.password
        this.createdAt = attribuites.createdAt
        this.updatedAt = attribuites.updatedAt
    }


    static async showUsers(){

        await db_connect()
    
        const sql = "SELECT * FROM users ORDER BY id_user"
        const result = await db_query(sql)

        const usersWithoutPassword = result.rows.map(user => {
            const { password, ...userWithoutPassword } = user
            return userWithoutPassword
        })

        return usersWithoutPassword
    }

    static async findUserById(id: number) {
        await db_connect()

        const sql = "SELECT * FROM users WHERE id_user = $1"
        const value = [id]
        const result = await db_query_params(sql, value)
        if(!result.rows || result.rows.length == 0) return null

        const user = result.rows[0]

        const {password, ...userWithoutPassword} = user
        
        return userWithoutPassword
    }

    static async createUser(attribuites: Omit<UsersAttribuites, "updatedAt" | "createdAt">) {
        const {name, cpf, email, password} = attribuites

        const createdAt = new Date()

        await db_connect()

        const criptPassword = await bcrypt.hash(password, 10)

        const sql = "INSERT INTO users(name, cpf, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *"
        const values = [name.toLowerCase(), cpf, email.toLowerCase(), criptPassword, createdAt]
        
        const result = await db_query_params(sql, values)

        const userInserido = result.rows[0]
        return userInserido
    }

    static async updateUser(id:number, attribuites: Omit<UsersAttribuites, "updatedAt" | "createdAt">) {
        const {name, cpf, email, password} = attribuites

        const lowerName = name.toLowerCase()
        const lowercpf = cpf.toLowerCase()
        const loweremail = email.toLowerCase()
        
        if (!name || !cpf || !email || !password) {
            return false
        }
        await db_connect()

        const sql = "UPDATE users SET name = $1, cpf = $2, email = $3, password = $4 WHERE id_user = $5 RETURNING *"
        const criptPassword = await bcrypt.hash(password, 10)
        const values = [lowerName, lowercpf, loweremail, criptPassword, id]

        const result = await db_query_params(sql, values)
        if(!result.rows || result.rows.length == 0) return null

        const userUpdate = result.rows[0]

        return userUpdate
    }

    static async deletedUser(id: number) {
        await db_connect()
        const sql = "DELETE FROM users WHERE id_user = $1 RETURNING *"
        const value = [id]

        const result = await db_query_params(sql, value)
        if(!result.rows || result.rows.length == 0) return null
        const userDeleted = result.rows[0]
        return userDeleted
    }
    
    static async getEmail(attribuites: {email: string}) {
        const {email} = attribuites


        db_connect()

        const sql = "SELECT * FROM users WHERE email = $1 RETURNING *"
        const value = [email.toLowerCase()]

        const result = await db_query_params(sql, value)

        const resultEmail = result.rows[0]

        return resultEmail
    }

}