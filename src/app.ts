
import express from "express";
import { router_users } from "./router/users_router";
import { router_cars } from "./router/cars_router";
import { router_rental } from "./router/rental_router";
import { AuthMiddleware } from "./middlewares/auth-middleware";
import { LoginController } from "./controllers/LoginController";

const authMiddleware = new AuthMiddleware()
const loginController = new LoginController()

const app = express()

app.use(express.json())

app.post('/api/login', loginController.login)

app.use(authMiddleware.authUser)
app.use("/api", router_users)
app.use("/api", router_cars)
app.use("/api", router_rental)


const PORT = 3000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})