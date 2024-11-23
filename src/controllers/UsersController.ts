import { UsersService } from "../service/UsersService"
import { Handler } from "express";
import { z } from "zod"
import { HttpError } from "../errors/HttpError";


const UserRequestSchema = z.object({
    name: z.string(),
    cpf: z.string(),
    email: z.string(),
    password: z.string(),
})

const UpdateRequestSchema = z.object({
    name: z.string(),
    cpf: z.string(),
    email: z.string(),
    password: z.string(),
})

export class UsersController{
    // GET /api/users
    showAllUsers: Handler = async (req, res) => {
        const users = await UsersService.ShowUsers()
        res.json(users)
    }

    showOneUser: Handler = async (req, res) => {
        const {id} = req.params
        try {
            const user = await UsersService.findUserById(+id)
            res.json(user)
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ status: error.status, message: error.message });
            }
        }
    }

    createdUser: Handler = async (req, res) => {
        try {
            const parsedBody = UserRequestSchema.parse(req.body)
            const newUser = await UsersService.createUser(parsedBody)
            res.json(newUser)
        } catch (error) {
            if(error instanceof HttpError) {
                res.status(error.status).json({ message: error.message})
            }
        }
    }

    updateUser: Handler = async (req, res) => {
        const {id} = req.params
        try {
            const contentBody = UpdateRequestSchema.parse(req.body)
            const update = await UsersService.updateUser(+id, contentBody)
            res.json(update)
        } catch (error) {
            if(error instanceof HttpError) {
                res.status(error.status).json({message: error.message})
            }
        }
    }

    deletedUser: Handler = async (req, res) => {
        const {id} = req.params
        try {
            const deletedUser = await UsersService.deletedUser(+id)
            res.json(deletedUser)
        } catch (error) {
            if(error instanceof HttpError) {
                res.status(error.status).json({message: error.message})
            }
        }
    }
}
