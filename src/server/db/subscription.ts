import { UserSubscriptionTable, TodosTable } from "@/drizzle/schema"
import { db } from "@/drizzle/db"

export function createUserSubscription(
    data: typeof UserSubscriptionTable.$inferInsert
) {
    return db
        .insert(UserSubscriptionTable)
        .values(data)
        .onConflictDoNothing({
            target: UserSubscriptionTable.clerkUserId
        })
}

