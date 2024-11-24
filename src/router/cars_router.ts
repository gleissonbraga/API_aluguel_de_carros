import { Router } from "express";
import { CarsController } from "../controllers/CarsController"

const router_cars = Router()
const carsController = new CarsController()

router_cars.get("/cars", carsController.showAllCars)
router_cars.post("/cars", carsController.createCar)



export { router_cars }