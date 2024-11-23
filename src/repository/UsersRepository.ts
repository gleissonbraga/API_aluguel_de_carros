
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
        this.name = attribuites.name,
        this.cpf = attribuites.cpf,
        this.email = attribuites.email,
        this.password = attribuites.password
        this.createdAt = attribuites.createdAt
        this.updatedAt = attribuites.updatedAt
    }


    static async showUsers(){

        await db_connect()
    
        const sql = "select * from users"
        const res = await db_query(sql)

    
        return res.rows
    }

    static async findUserById(id: number) {
        await db_connect()

        const sql = "select * from users where id_user = $1"
        const value = [id]
        const result = await db_query_params(sql, value)
        if(!result.rows || result.rows.length == 0) return null

        const user = result.rows[0]
        return user
    }

    static async createUser(attribuites: Omit<UsersAttribuites, "updatedAt" | "createdAt">) {
        const {name, cpf, email, password} = attribuites

        const createdAt = new Date()

        await db_connect()

        const criptPassword = await bcrypt.hash(password, 10)

        const sql = "insert into users(name, cpf, email, password, created_at) values ($1, $2, $3, $4, $5) RETURNING *"
        const values = [name, cpf, email, criptPassword, createdAt]
        
        const result = await db_query_params(sql, values)

        const userInserido = result.rows[0]
        return userInserido
    }
    
}