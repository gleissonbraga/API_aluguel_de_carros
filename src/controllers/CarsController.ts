import { Handler } from "express";
import { z } from "zod"
import { HttpError } from "../errors/HttpError";
import { CarsService } from "../service/CarsService";


const CarRequestSchema = z.object({
    marca: z.string(),
    modelo: z.string(),
    tipo: z.string(),
    placa: z.string(),
    cor: z.string(),
    ano: z.string(),
    status: z.string(),
})

const CarByNameRequestSchema = z.object({
    modelo: z.string()
})

const CarByPlateRequestSchema = z.object({
    plate: z.string()
})


export class CarsController {
    showAllCars: Handler = async (req, res) => {
        const cars = await CarsService.showCars()
        res.json(cars)
    }

    createCar: Handler = async (req, res) => {
        try {
            const parsedBody = CarRequestSchema.parse(req.body)
            const newCar = await CarsService.createCar(parsedBody)
            res.json(newCar)
        } catch (error) {
            if(error instanceof HttpError) {
                res.status(error.status).json({ message: error.message})
            }
        }
    }

    showCarByModelo: Handler = async (req, res) => {
        try {
            const parsedBody = CarByNameRequestSchema.parse(req.body)
            const car = await CarsService.findCarsByModelo(parsedBody.modelo)
            res.json(car)
        } catch (error) {
            if(error instanceof HttpError) {
                res.status(error.status).json({ message: error.message})
            }
        }
    }   

    findCarByPlate: Handler = async (req, res) => {
        try {
            const parsedBody = CarByPlateRequestSchema.parse(req.body)
            const car = await CarsService.findCarByPlate(parsedBody.plate)
            res.json(car)
        } catch (error) {
            if(error instanceof HttpError) {
                res.status(error.status).json({ message: error.message})
            }
        }
    }
}

