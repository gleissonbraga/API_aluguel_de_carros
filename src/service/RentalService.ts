import { HttpError } from "../errors/HttpError"
import { RentalRepository } from "../repository/RentalRepository"


export class RentalService {
    static async rentalCar(attributes: {id_car: number, id_user: number}){
        // const { id_car, id_user } = attributes
        
        const rental = await RentalRepository.rentalCar(attributes)

        if(rental === null ) {
            throw new HttpError(409, "Este carro já está alugado")
        } else if (rental === true) {
            throw new HttpError(400, "Este carro não existe")
        } else if (rental === false) {
            throw new HttpError(400, "Este usuário não existe")
        } else {
            return rental
        }
    }

    static async returnCar(id_car: number, id_user: number) {
        const returnRentalCar = await RentalRepository.returnCar(id_car, id_user)

        if(returnRentalCar === false) {
            throw new HttpError(400, "Este carro esta alugado")
        } else if(returnRentalCar === true) {
            throw new HttpError(400, "Não é possivel devolver este carro. Estes dados não existem")
        } else {
            
            return returnRentalCar
        }
    }
}