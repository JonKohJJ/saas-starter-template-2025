import { db } from "@/drizzle/db";
import { TodosTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export function getTodos(userId: string, { limit }: { limit?: number }) {
    return db.query.TodosTable.findMany({
        where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
        orderBy: (({ createdAt }, {desc}) => desc(createdAt)),
        limit,
    })
}
  
export async function createTodo(data: typeof TodosTable.$inferInsert) {
    return db
        .insert(TodosTable)
        .values(data)
        .returning()
}

export async function deleteTodo({id, userId} : {id: string, userId: string}) {
    return db
        .delete(TodosTable)
        .where(and(eq(TodosTable.id, id), eq(TodosTable.clerkUserId, userId)))
        .returning()
} 