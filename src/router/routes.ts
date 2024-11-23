import { Router } from "express";
import { UsersController } from "../controllers/UsersController"

const router = Router()
const usersController = new UsersController()

router.get("/", usersController.showAllUsers)
router.get("/user/:id", usersController.showOneUser)
router.post("/user", usersController.createdUser)
router.delete("/user/:id", usersController.deletedUser)



export { router }