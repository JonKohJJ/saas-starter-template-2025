import { subscriptionTiers, TierNames } from "@/data/subscriptionTiers";
import { index, pgEnum, pgTable, text, timestamp, uuid, varchar, integer } from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())

// Enums
export const TierEnum = pgEnum("tier", Object.keys(subscriptionTiers) as [TierNames])

// USER TABLE
export const UserSubscriptionTable = pgTable(
    "user_subscriptions",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        clerkUserId: text("clerk_user_id").notNull().unique(),
        stripeSubscriptionItemId: text("stripe_subscription_item_id"),
        stripeSubscriptionId: text("stripe_subscription_id"),
        stripeCustomerId: text("stripe_customer_id"),
        tier: TierEnum("tier").notNull(),
        createdAt,
        updatedAt,
    },
    table => ({
        clerkUserIdIndex: index("user_subscriptions.clerk_user_id_index").on(table.clerkUserId),
        stripeCustomerIdIndex: index("user_subscriptions.stripe_customer_id_index").on(table.stripeCustomerId),
    })
)

//  TODO TABLE
export const TodosTable = pgTable(
    "todos",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        clerkUserId: text("clerk_user_id").notNull(),
        todoName: varchar("todo_name", { length: 256 }).notNull(),
        createdAt,
        updatedAt,
    },
    table => ({
        clerkUserIdIndex: index("todos.clerk_user_id_index").on(table.clerkUserId)
    })
)