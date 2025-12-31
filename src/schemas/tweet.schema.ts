
import z from "zod";

export const CreateTweetSchema = z.object({
    content : z.string().max(280).nonempty()
})