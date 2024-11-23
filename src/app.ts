
import express from "express";
import { router } from "./router/routes";


const app = express()

app.use(express.json())

app.use("/api", router)


const PORT = 3000
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})