import { db } from "@/drizzle/db";
import { TodosTable, UserSubscriptionTable } from "@/drizzle/schema";
import { CACHE_TAGS, revalidateDbCache } from "@/lib/cache";
import { eq } from "drizzle-orm";

export async function deleteUser(clerkUserId: string) {

    const deletedUser = await db
        .delete(UserSubscriptionTable)
        .where(eq(UserSubscriptionTable.clerkUserId, clerkUserId))
        .returning()
    
    const deletedTodos = await db
        .delete(TodosTable)
        .where(eq(TodosTable.clerkUserId, clerkUserId))
        .returning()
    

    deletedUser.forEach((user) => {
        revalidateDbCache({
            tag: CACHE_TAGS.subscription,
            id: user.id,
            userId: clerkUserId
        })
    })

    deletedTodos.forEach((todo) => {
        revalidateDbCache({
            tag: CACHE_TAGS.todos,
            id: todo.id,
            userId: clerkUserId
        })
    })

}