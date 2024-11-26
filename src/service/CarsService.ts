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

    static async findCarsByModelo(name: string) {

        const car = await CarsRepository.findCarsByModelo(name)

        if(car === null){
            throw new HttpError(400, "Modelo não encontrado")
        } else {
            return car
        }
    }

    static async findCarByPlate(plate: string){
        const car = await CarsRepository.findCarByPlate(plate)

        if(car === false) {
            throw new HttpError(400, "Insira os dados corretos")
        } else if (car === null){
            throw new HttpError(400, "Placa não encontrada")
        } else {
            return car
        }
    }

    static async updateCar(id: number, attribuites: {marca: string, modelo: string, tipo: string, placa: string, cor: string, ano: string}) {

        const updateCar = await CarsRepository.updateCar(id, attribuites)

        if(updateCar === false) {
            throw new HttpError(400, "Erro ao atualizar usuário. Todos os dados são obrigatórios")
        } else if(updateCar === null) {
            throw new HttpError(400, "Carro não encontrado")
        } else {
            return updateCar
        }
    }
}