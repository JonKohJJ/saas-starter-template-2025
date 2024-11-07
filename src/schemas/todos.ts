import { z } from "zod"

export const todosSchema = z.object({
    todoName: z.string().min(1, "Required"),
})