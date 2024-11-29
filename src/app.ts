
import express from "express";
import { router_users } from "./router/users_router";
import { router_cars } from "./router/cars_router";
import { router_rental } from "./router/rental_router";


const app = express()

app.use(express.json())

app.use("/api", router_users)
app.use("/api", router_cars)
app.use("/api", router_rental)


const PORT = 3000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})