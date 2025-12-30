import { Request, Response, NextFunction } from "express";
import * as UserService from '../services/user/user.service'
import { StatusCodes } from "http-status-codes";

export const createUserController = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userData = req.body
        const newUser = await UserService.createUser(userData)
        res.status(StatusCodes.CREATED).json({
            message: "User created succesffuly",
            data: newUser
        })
    } catch (error) {
        next(error)
    }
}