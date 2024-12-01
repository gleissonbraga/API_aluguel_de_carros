// /carros/:placa/usuarios/:id


import { Router } from "express";
import { RentalController } from "../controllers/RentalController"

const router_rental = Router()
const rentalController = new RentalController()


router_rental.post("/cars/:carro/user/", rentalController.rentalCar)
router_rental.put("/cars/:carro/user/", rentalController.returnCar)



export { router_rental }