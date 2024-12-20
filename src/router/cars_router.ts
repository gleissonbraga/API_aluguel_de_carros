import { Router } from "express";
import { CarsController } from "../controllers/CarsController"

const router_cars = Router()
const carsController = new CarsController()


router_cars.post("/cars", carsController.createCar)
router_cars.get("/cars/modelo", carsController.showCarByModelo)
router_cars.get("/cars/placa", carsController.findCarByPlate)
router_cars.get("/cars/status", carsController.findCarByStatus)
router_cars.put("/cars/atualizar/:id", carsController.updateCar)



export { router_cars }