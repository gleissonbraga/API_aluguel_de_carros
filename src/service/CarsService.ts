import { HttpError } from "../errors/HttpError"
import { CarsRepository } from "../repository/CarsRepository"


export class CarsService{

    static async showCars(){
        return await CarsRepository.showCars()
    }

    static async createCar(attribuites: {marca: string, modelo: string, tipo: string, placa: string, cor: string, ano: string, status: string}) {

        const {marca, modelo, tipo, placa, cor, ano, status} = attribuites
        
        if(!marca || !modelo || !tipo || !placa || !cor || !ano || !status) {
            throw new HttpError(400, "Erro ao cadastrar o carro. Todos os dados são obrigatórios")
        } else {
            const newCar = await CarsRepository.createCar({marca, modelo, tipo, placa, cor, ano, status})
            return newCar
        }
    }
}