import { UserSubscriptionTable, TodosTable } from "@/drizzle/schema"
import { db } from "@/drizzle/db"
import { CACHE_TAGS, revalidateDbCache } from "@/lib/cache"

export async function createUserSubscription(
    data: typeof UserSubscriptionTable.$inferInsert
) {
    const [newSubscription] = await db
        .insert(UserSubscriptionTable)
        .values(data)
        .onConflictDoNothing({
            target: UserSubscriptionTable.clerkUserId
        })
        .returning()
    
    if (newSubscription != null) {
        revalidateDbCache({
            tag: CACHE_TAGS.subscription,
            id: newSubscription.id,
            userId: newSubscription.clerkUserId
        })
    }

    return newSubscription
}

