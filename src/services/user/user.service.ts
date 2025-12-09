import { User } from "../../schemas/user.schemas";
import { prisma } from "../../lib/prisma";
import { hashPassword } from '../../utils/password'


export const createUser = async (data: User) => {
    const hashedPassword = await hashPassword(data.password)

     const user = await prisma.user.create({
       data: {
         ...data,
         password: hashedPassword,
       },
     });

     return user;
}

 
