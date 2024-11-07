"use server"

import { todosSchema } from "@/schemas/todos";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createTodo as createTodoDb, deleteTodo as deleteTodoDb } from "../db/todos";

export async function createTodo(
    unsafeData: z.infer<typeof todosSchema>
) {
    const { userId } = await auth()
    const { success, data } = todosSchema.safeParse(unsafeData) 

    if (!success || userId == null) {
        return {error: true, message: "There was an error adding your todo"}
    }

    return await createTodoDb({ ...data, clerkUserId: userId })
}


export async function deleteTodo(id: string) {
    const { userId } = await auth()

    if (userId == null) {
        return {error: true, message: "There was an error deleting your todo"}
    }

    return await deleteTodoDb({ id, userId })
}