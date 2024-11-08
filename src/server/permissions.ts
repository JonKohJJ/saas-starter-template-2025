import { getUserSubscriptionTier } from "./db/subscription"
import { getTodoCount } from "./db/todos"

export async function canAccessAnalytics(userId: string | null) {
    if (userId == null) return false
    const tier = await getUserSubscriptionTier(userId)
    return tier.canAccessAnalytics
}

export async function canAddTodo(userId: string | null) {
    if (userId == null) return false
    const tier = await getUserSubscriptionTier(userId)
    const todoCount = await getTodoCount(userId)
    return todoCount < tier.maxNumberOfTodos
}