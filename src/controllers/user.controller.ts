import { Request, Response, NextFunction } from "express";
import * as UserService from '../services/user.service'

export const createUserController = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData = req.body
        const newUser = await UserService.createUser(userData)
        res.status(201).json({
            message: "User created succesffuly",
            data: newUser
        })
    } catch (error) {
        next(error)
    }
}