import z from 'zod';

export const CreateTweetSchema = z.object({
  content: z.string().max(280).nonempty(),
});

export const UpdateTweetSchema = z.object({
  content: z.string().min(1).max(280),
});

export const DeleteTweetSchema = z.object({
  id: z.uuid()
});



