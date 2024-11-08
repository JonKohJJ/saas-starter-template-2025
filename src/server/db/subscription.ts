import { UserSubscriptionTable, TodosTable } from "@/drizzle/schema"
import { db } from "@/drizzle/db"
import { CACHE_TAGS, DbCache, getUserTag, revalidateDbCache } from "@/lib/cache"
import { subscriptionTiers } from "@/data/subscriptionTiers"

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

export function getUserSubscription(userId: string) {
    const cacheFn = DbCache(getUserSubscriptionInternal, {
        tags: [getUserTag(userId, CACHE_TAGS.subscription)]
    })
    return cacheFn(userId)
}

export async function getUserSubscriptionTier(userId: string) {
    const subscription = await getUserSubscription(userId)
    if (subscription == null) throw new Error("User has no subscription")
    return subscriptionTiers[subscription.tier]
}

function getUserSubscriptionInternal(userId: string){
    return db
        .query.UserSubscriptionTable.findFirst({
            where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
        })
}