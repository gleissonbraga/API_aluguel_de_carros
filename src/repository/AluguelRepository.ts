import { db_connect, db_query, db_query_params } from "../config/db"

interface RentalAttribuites {
    id_car: number
    id_user: number
    start_date: Date
    end_date: Date 
    status_rental: string
}


export class RestalRepository{
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
        
        
        if(!id_car || !id_user) return null
        
        const low_status_rental = "ativo"

        const start_date = new Date()
        await db_connect()

        await db_query('BEGIN')

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


    // static async returnCar(id_user)
}