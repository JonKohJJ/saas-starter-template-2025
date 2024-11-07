import { db } from "@/drizzle/db";
import { TodosTable, UserSubscriptionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export function deleteUser(clerkUserId: string) {
    return db.batch([
        db
            .delete(UserSubscriptionTable)
            .where(eq(UserSubscriptionTable.clerkUserId, clerkUserId)),
        db
            .delete(TodosTable)
            .where(eq(TodosTable.clerkUserId, clerkUserId))
    ])
}