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
    priceBuy: z.number(),
    priceSale: z.number(),
    priceRent: z.number(),
})



const UpdateCarRequestSchema = z.object({
    marca: z.string(),
    modelo: z.string(),
    tipo: z.string(),
    placa: z.string(),
    cor: z.string(),
    ano: z.string(),
    priceBuy: z.number(),
    priceSale: z.number(),
    priceRent: z.number(),
})

const CarByNameRequestSchema = z.object({
    modelo: z.string()
})

const CarByPlateRequestSchema = z.object({
    plate: z.string()
})

const CarsByStatusRequestSchema = z.object({
    status: z.string()
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

    findCarByStatus: Handler = async (req, res) => {
        try {
            const parsedBody = CarsByStatusRequestSchema.parse(req.body)
            const cars = await CarsService.findCarsByStatus(parsedBody.status)
            res.json(cars)
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

    updateCar: Handler = async(req, res) => {
        const {id} = req.params
        try {
            const contentBody = UpdateCarRequestSchema.parse(req.body)
            const updateCar = await CarsService.updateCar(+id, contentBody)
            res.json(updateCar)
        } catch (error) {
            if(error instanceof HttpError) {
                res.status(error.status).json({message: error.message})
            }
        } 
    }
}

