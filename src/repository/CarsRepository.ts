import { db_connect, db_query, db_query_params } from "../config/db"

interface CarsAttributes {
    marca: string,
    modelo: string,
    tipo: string,
    placa: string,
    cor: string,
    ano: string,
    status: string
    createdAt: Date
}


export class CarsRepository {
    marca: string
    modelo: string
    tipo: string
    placa: string
    cor: string
    ano: string
    status: string
    createdAt: Date

    constructor(attributes: CarsAttributes){
        this.marca = attributes.marca
        this.modelo = attributes.modelo
        this.tipo = attributes.tipo
        this.placa = attributes.placa
        this.cor = attributes.cor
        this.ano = attributes.ano
        this.status = attributes.status
        this.createdAt = attributes.createdAt
    }

    static async showCars(){
        await db_connect()

        const sql = "SELECT * FROM cars"
        const result = await db_query(sql)

        return result.rows
    }

    static async createCar(attribuites: Omit<CarsAttributes, "createdAt">){
        const { marca, modelo, tipo, placa, cor, ano, status } = attribuites

        const createdAt = new Date()

        await db_connect()

        const sql = "INSERT INTO cars(marca, modelo, tipo, placa, cor, ano, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
        const values = [marca.toLowerCase(), modelo.toLowerCase(), tipo.toLowerCase(), placa.toLowerCase(), cor.toLowerCase(), ano, status.toLowerCase(), createdAt]

        const result = await db_query_params(sql, values)

        const carInsert = result.rows[0]
        return carInsert

    }

    static async findCarsByModelo(name: string){
        const lowerName = name.toLowerCase();


        const sql = "SELECT * FROM cars WHERE modelo ILIKE $1"
        const value = [`%${lowerName}%`]

        const result = await db_query_params(sql,value)
        if(result.rows.length === 0) return null

        return result.rows
    }

    static async findCarByPlate(plate: string){
        const lowerPlate = plate.toLowerCase()
        const regex = /^[a-z]{3}[0-9][a-z][0-9]{2}$/i
        if(!regex.test(plate) || plate === ' ') return false
        

        const sql = "SELECT * FROM cars WHERE placa = $1"
        const value = [lowerPlate]
        const result = await db_query_params(sql, value)
        if(result.rows.length === 0) return null

        const car = result.rows[0]

        console.log(car)

        return car
    }
}