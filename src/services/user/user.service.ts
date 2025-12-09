import { User } from "../schemas/user.schemas";

export const createUser = async (data: User) => {
    console.log("Service: Saving user to DB....", data)
    return {
        id: "user_123",
        ...data,
        createdAt: new Date()
    }
}