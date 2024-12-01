import { db_connect, db_query, db_query_params } from "../config/db"

interface RentalAttribuites {
    id_car: number
    id_user: number
    start_date: Date
    end_date: Date 
    status_rental: string
}


export class RentalRepository{
    id_car: number
    id_user: number
    start_date: Date
    end_date: Date 
    status_rental: string

    constructor(attributes: RentalAttribuites){
        this.id_car = attributes.id_car
        this.id_user = attributes.id_user
        this.start_date = attributes.start_date
        this.end_date = attributes.end_date
        this.status_rental = attributes.status_rental
    }


    static async rentalCar(attributes: Omit<RentalAttribuites, "end_date" | "start_date" | "status_rental">){
        const { id_car, id_user } = attributes
        
        
        const low_status_rental = "ativo"

        const start_date = new Date()
        await db_connect()

        await db_query('BEGIN')

        const sqlExistCar = "SELECT * FROM cars WHERE id_carro = $1"
        const valueExistCar = [id_car]
        const carExist = await db_query_params(sqlExistCar, valueExistCar)

        if(carExist.rows.length === 0) return true
        
        const sqlExistUser = "SELECT * FROM users WHERE id_user = $1"
        const valueExistUser = [id_user]
        const UserExist = await db_query_params(sqlExistUser, valueExistUser)
        
        if(UserExist.rows.length === 0) return false

        const active = "ativo"
        const sqlCheckCar = "SELECT * FROM aluguel_carros WHERE id_carro = $1 AND status_aluguel = $2"
        const valueCheckCar = [id_car, active]
        const carStatus = await db_query_params(sqlCheckCar, valueCheckCar)

        if(carStatus.rows.length > 0) return null

        const sql = "INSERT INTO aluguel_carros(id_carro, id_user, data_inicio, status_aluguel) VALUES ($1, $2, $3, $4) RETURNING *"
        const values = [id_car, id_user, start_date, low_status_rental]

        const result = await db_query_params(sql, values)


        const sqlCar = "UPDATE cars SET status = 'alugado' WHERE id_carro = $1"
        const valueCar = [id_user]
        await db_query_params(sqlCar, valueCar)

        
        await db_query('COMMIT')

        const resultRental = result.rows[0]
        return resultRental
    }


    static async returnCar(id_car: number, id_user: number) {
        db_connect()

        await db_query('BEGIN')

        const low_status_rental = 'desativado'
        const low_status_car = 'disponivel'
        const dateReturnRental = new Date()

        const activeExistCarRental = 'ativo'
        const sqlExistCarRental = 'SELECT * FROM aluguel_carros WHERE id_carro = $1 AND status_aluguel = $2'
        const valueExistCarRental = [id_car, activeExistCarRental]
        const resultExistCarRental = await db_query_params(sqlExistCarRental, valueExistCarRental)

        if(resultExistCarRental.rows.length === 0) return true

        const sqlCarAndUser = "SELECT * FROM aluguel_carros WHERE id_carro = $1 AND id_user = $2"
        const sqlValuCarAndUser = [id_car, id_user]
        const sqlResultCarAndUser = await db_query_params(sqlCarAndUser, sqlValuCarAndUser)

        if(sqlResultCarAndUser.rows.length === 0) return false

        const activeCarReturnStatusRental = "ativo"
        const sqlCarReturnStatusRental = "UPDATE aluguel_carros SET status_aluguel = $1, data_fim = $2 WHERE id_carro = $3 AND id_user = $4 AND status_aluguel = $5"
        const valuesCarReturnStatusRental = [low_status_rental, dateReturnRental, id_car, id_user, activeCarReturnStatusRental]
        await db_query_params(sqlCarReturnStatusRental,  valuesCarReturnStatusRental)

        const sqlCarReturnStatus = "UPDATE cars SET status = $1 WHERE id_carro = $2 RETURNING *"
        const valuesCarReturnStatus = [low_status_car, id_car]
        const result = await db_query_params(sqlCarReturnStatus, valuesCarReturnStatus)

        await db_query('COMMIT')

        if(!result.rows || result.rows.length == 0) return null

        const resultCar = result.rows[0]
        return resultCar
        
        
    }
}