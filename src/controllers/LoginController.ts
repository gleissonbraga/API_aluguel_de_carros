import { Handler } from "express";
import { z } from "zod"
import { HttpError } from "../errors/HttpError";
import { LoginService } from "../service/LoginService";

const UserRequestSchema = z.object({
    email: z.string(),
    password: z.string()
})

export class LoginController {
    login: Handler = async (req, res) => {

        try {
            const parsedBody = UserRequestSchema.parse(req.body)
            
            const userValidation = await LoginService.login(parsedBody)
        
            
            res.json(userValidation)
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({ message: error.message })
            }
        }
    }
}
