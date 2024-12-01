import { Handler } from "express";
import { z } from "zod"
import { HttpError } from "../errors/HttpError";
import { RentalService } from "../service/RentalService";


export class RentalController {
    rentalCar: Handler = async (req, res) => {
        const {carro} = req.params
        
        try {
            const rental = await RentalService.rentalCar({id_car: Number(carro), id_user: Number(req.userId)})
            res.json(rental)
        } catch (error) {
            if(error instanceof HttpError) {
                res.status(error.status).json({ message: error.message})
            }
        }
    }

    returnCar: Handler = async (req, res) => {
        const {carro} = req.params

        try {
            const rental = await RentalService.returnCar(Number(carro), Number(req.userId))
            res.json(rental)
        } catch (error) {
            if(error instanceof HttpError) {
                res.status(error.status).json({ message: error.message})
            }
        }
    }
}