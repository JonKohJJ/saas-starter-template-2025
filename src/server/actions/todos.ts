"use server"

import { todosSchema } from "@/schemas/todos";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { 
    createTodo as createTodoDb, 
    deleteTodo as deleteTodoDb,
    updateTodo as updateTodoDb,
} from "../db/todos";
import { canAddTodo } from "../permissions";

export async function createTodo(
    unsafeData: z.infer<typeof todosSchema>
) {
    const { userId } = await auth()
    const { success, data } = todosSchema.safeParse(unsafeData)
    const canAdd = await canAddTodo(userId)

    if (!success || userId == null || !canAdd) {
        return {error: true, message: "There was an error adding your todo"}
    }

    return await createTodoDb({ ...data, clerkUserId: userId })
}

export async function updateTodo(
    id: string,
    unsafeData: z.infer<typeof todosSchema>
) {
    const { userId } = await auth()
    const { success, data } = todosSchema.safeParse(unsafeData) 

    if (!success || userId == null) {
        return {error: true, message: "There was an error updating your todo"}
    }

    return await updateTodoDb(data, { id, userId })
}

export async function deleteTodo(id: string) {
    const { userId } = await auth()

    if (userId == null) {
        return {error: true, message: "There was an error deleting your todo"}
    }

    return await deleteTodoDb({ id, userId })
}