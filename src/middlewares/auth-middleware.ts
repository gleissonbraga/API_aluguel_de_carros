import { LoginService } from "../service/LoginService";
import { Handler } from "express";
import { z } from "zod"
import { HttpError } from "../errors/HttpError";

export class AuthMiddleware {

    authUser: Handler = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization
            
            if(!authHeader) throw new HttpError(401, "Token não fornecido")
            
            const payload = await LoginService.verifyToken(authHeader)

            console.log({payload})
            
            next()
        } catch (error) {
            if(error instanceof HttpError){
                res.status(error.status).json({message: error.message})
            }
        }
        
    }
}