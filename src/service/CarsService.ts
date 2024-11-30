import { HttpError } from "../errors/HttpError"
import { CarsRepository } from "../repository/CarsRepository"


export class CarsService{

    static async showCars(){
        return await CarsRepository.showCars()
    }

    static async createCar(attribuites: {marca: string, modelo: string, tipo: string, placa: string, cor: string, ano: string, status: string, priceBuy: number, priceSale: number, priceRent: number}) {

        const {marca, modelo, tipo, placa, cor, ano, status, priceBuy, priceSale, priceRent} = attribuites
        
        if(!marca || !modelo || !tipo || !placa || !cor || !ano || !status || !priceBuy || !priceSale || !priceRent) {
            throw new HttpError(400, "Erro ao cadastrar o carro. Todos os dados são obrigatórios")
        } else {
            const newCar = await CarsRepository.createCar({marca, modelo, tipo, placa, cor, ano, status, priceBuy, priceSale, priceRent})
            return newCar
        }
    }

    static async findCarsByModelo(name: string) {

        const car = await CarsRepository.findCarsByModelo(name)

        if(car === null){
            throw new HttpError(400, `Modelo não encontrado`)
        } else if(car === false){
            throw new HttpError(400, `Insira uma placa`)
        } else {
            return car
        }
    }

    static async findCarsByStatus(status: string) {

        const cars = await CarsRepository.findCarsByStatus(status)

        if(cars === false){
            throw new HttpError(400, `O campo esta vazio. Insira um dado válido`)
        } else if (cars === null){
            throw new HttpError(400, `Não temos carro ${status}`)
        } else {
            return cars
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

    static async updateCar(id: number, attribuites: {marca: string, modelo: string, tipo: string, placa: string, cor: string, ano: string, priceBuy: number, priceSale: number, priceRent: number}) {

        const updateCar = await CarsRepository.updateCar(id, attribuites)

        if(updateCar === false) {
            throw new HttpError(400, "Erro ao atualizar o carro. Todos os dados são obrigatórios")
        } else if(updateCar === null) {
            throw new HttpError(400, "Carro não encontrado")
        } else {
            return updateCar
        }
    }
}