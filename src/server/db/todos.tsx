import { db } from "@/drizzle/db";
import { TodosTable } from "@/drizzle/schema";
import { CACHE_TAGS, DbCache, getUserTag, revalidateDbCache } from "@/lib/cache";
import { and, eq } from "drizzle-orm";

export function getTodos(userId: string, { limit }: { limit?: number }) {
    const cacheFn = DbCache(getTodosInternal, {
        tags: [getUserTag(userId, CACHE_TAGS.todos)]
    })

    return cacheFn(userId, { limit })
}
  
export async function createTodo(data: typeof TodosTable.$inferInsert) {
    const [newTodo] = await db
        .insert(TodosTable)
        .values(data)
        .returning()

    revalidateDbCache({
        tag: CACHE_TAGS.todos,
        userId: newTodo.clerkUserId,
        id: newTodo.id
    })

    return newTodo
}

export async function deleteTodo({id, userId} : {id: string, userId: string}) {
    const [deletedTodo] = await db
        .delete(TodosTable)
        .where(and(eq(TodosTable.id, id), eq(TodosTable.clerkUserId, userId)))
        .returning()

    revalidateDbCache({
        tag: CACHE_TAGS.todos,
        userId: deletedTodo.clerkUserId,
        id: deletedTodo.id
    })

    return deletedTodo
} 


function getTodosInternal(userId: string, { limit }: { limit?: number }) {
    return db.query.TodosTable.findMany({
        where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
        orderBy: (({ createdAt }, {desc}) => desc(createdAt)),
        limit,
    })
}