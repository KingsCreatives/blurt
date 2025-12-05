import z, { email } from "zod";

export const UserSchema = z.object({
    username: z.string().min(4).max(20),
    email: z.email(),
    password: z.string().min(6)
})


export type User = z.infer<typeof UserSchema>