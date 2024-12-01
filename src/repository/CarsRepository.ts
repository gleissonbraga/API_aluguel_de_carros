import { db_connect, db_query, db_query_params } from "../config/db"

interface CarsAttributes {
    marca: string,
    modelo: string,
    tipo: string,
    placa: string,
    cor: string,
    ano: string,
    status: string
    priceBuy: number
    priceSale: number
    priceRent: number
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
    priceBuy: number
    priceSale: number
    priceRent: number
    createdAt: Date

    constructor(attributes: CarsAttributes){
        this.marca = attributes.marca
        this.modelo = attributes.modelo
        this.tipo = attributes.tipo
        this.placa = attributes.placa
        this.cor = attributes.cor
        this.ano = attributes.ano
        this.status = attributes.status
        this.priceBuy = attributes.priceBuy
        this.priceSale = attributes.priceSale
        this.priceRent = attributes.priceRent
        this.createdAt = attributes.createdAt
    }

    static async showCars(){
        await db_connect()

        const sql = "SELECT * FROM cars ORDER BY id_carro"
        const result = await db_query(sql)

        return result.rows
    }

    static async createCar(attribuites: Omit<CarsAttributes, "createdAt">){
        const { marca, modelo, tipo, placa, cor, ano, status, priceBuy, priceSale, priceRent } = attribuites

        const createdAt = new Date()

        await db_connect()

        const sql = "INSERT INTO cars(marca, modelo, tipo, placa, cor, ano, status, preco_compra, preco_venda, preco_aluguel, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *"
        const values = [marca.toLowerCase(), modelo.toLowerCase(), tipo.toLowerCase(), placa.toLowerCase(), cor.toLowerCase(), ano, status.toLowerCase(), priceBuy, priceSale, priceRent, createdAt]

        const result = await db_query_params(sql, values)

        const carInsert = result.rows[0]
        return carInsert

    }

    static async findCarsByModelo(name: string){
        const lowerName = name.toLowerCase();

        if(lowerName.trim() === "" ) return false


        const sql = "SELECT * FROM cars WHERE modelo ILIKE $1"
        const value = [`%${lowerName}%`]

        const result = await db_query_params(sql,value)
        if(result.rows.length === 0) return null

        return result.rows
    }

    static async findCarsByStatus(status: string){
        const lowerStatus = status.toLowerCase();

        if(lowerStatus.trim() === "" ) return false


        const sql = "SELECT * FROM cars WHERE status = $1 ORDER BY id_carro"
        const value = [lowerStatus]

        const result = await db_query_params(sql,value)
        if(result.rows.length === 0) return null

        return result.rows
    }

    static async findCarByPlate(plate: string){
        const lowerPlate = plate.toLowerCase()
        const regex = /^[a-z]{3}[0-9][a-z][0-9]{2}$/i
        if(!regex.test(lowerPlate) || lowerPlate === '' || lowerPlate.length !== 7) return false
        
        await db_connect()

        const sql = "SELECT * FROM cars WHERE placa = $1"
        const value = [lowerPlate]
        const result = await db_query_params(sql, value)
        if(!result.rows || result.rows.length === 0) return null

        const car = result.rows[0]

        return car
    }

    static async updateCar(id: number, attribuites: Omit<CarsAttributes, "status" | "createdAt">) {
        const { marca, modelo, tipo, placa, cor, ano, priceBuy, priceSale, priceRent } = attribuites

        const marcaLower = marca.toLowerCase()
        const modeloLower = modelo.toLowerCase()
        const tipoLower = tipo.toLowerCase()
        const placaLower = placa.toLowerCase()
        const corLower = cor.toLowerCase()

        if(!marca || !modelo || !tipo || !placa || !cor || !ano) return false

        const sql = "UPDATE cars SET marca = $1, modelo = $2, tipo = $3, placa = $4, cor = $5, ano = $6, preco_compra = $7, preco_venda = $8, preco_aluguel = $9  WHERE id_carro = $10 RETURNING *"
        const values = [marcaLower, modeloLower, tipoLower, placaLower, corLower, ano, priceBuy, priceSale, priceRent, id]

        const result = await db_query_params(sql, values)

        if(!result.rows || result.rows.length == 0) return null

        const carUpdate = result.rows[0]

        return carUpdate
    }
}