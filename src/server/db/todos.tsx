import { db } from "@/drizzle/db";
import { TodosTable } from "@/drizzle/schema";
import { CACHE_TAGS, DbCache, getIdTag, getUserTag, revalidateDbCache } from "@/lib/cache";
import { count } from "drizzle-orm";
import { and, eq } from "drizzle-orm";

export function getTodos(userId: string, { limit }: { limit?: number }) {
    const cacheFn = DbCache(getTodosInternal, {
        tags: [getUserTag(userId, CACHE_TAGS.todos)]
    })

    return cacheFn(userId, { limit })
}

function getTodosInternal(userId: string, { limit }: { limit?: number }) {
    const data = db.query.TodosTable.findMany({
        where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
        orderBy: (({ createdAt }, {desc}) => desc(createdAt)),
        limit,
    })
    
    return data
} 

export function getTodo({ id, userId } : {id: string, userId: string}) {
    const cacheFn = DbCache(getTodoInternal, {
        tags: [getIdTag(id, CACHE_TAGS.todos)]
    })

    return cacheFn({ id, userId })
}

export function getTodoCount(userId: string) {
    const cacheFn = DbCache(getTodoCountInternal, {
        tags: [getUserTag(userId, CACHE_TAGS.todos)]
    })

    return cacheFn(userId)
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

export async function updateTodo(
    data: Partial<typeof TodosTable.$inferInsert>, 
    { id, userId } : { id: string, userId: string }
) {
    const [updatedTodo] = await db
        .update(TodosTable)
        .set(data)
        .where(and(eq(TodosTable.clerkUserId, userId), eq(TodosTable.id, id)))
        .returning()
    
    revalidateDbCache({
        tag: CACHE_TAGS.todos,
        userId: userId,
        id: id
    })
    
    return updatedTodo
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



function getTodoInternal({ id, userId } : {id: string, userId: string}) {
    return db.query.TodosTable.findFirst({
        where: ({ clerkUserId, id: idCol }, { eq, and }) => and(eq(clerkUserId, userId), eq(idCol, id)),
    })
}

async function getTodoCountInternal(userId: string) {
    const counts = await db
        .select({ todoCount: count() }).from(TodosTable)
        .where(eq(TodosTable.clerkUserId, userId))

    return counts[0]?.todoCount ?? 0
}

