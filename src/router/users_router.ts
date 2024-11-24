import { Router } from "express";
import { UsersController } from "../controllers/UsersController"

const router_users = Router()
const usersController = new UsersController()

router_users.get("/users", usersController.showAllUsers)
router_users.get("/user/:id", usersController.showOneUser)
router_users.post("/user", usersController.createdUser)
router_users.put("/user/:id", usersController.updateUser)
router_users.delete("/user/:id", usersController.deletedUser)



export { router_users }