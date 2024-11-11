import { subscriptionTiers, TierNames } from "@/data/subscriptionTiers";
import { index, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())


// export const TypesEnum = pgEnum("types_enum", ['Income', 'Savings', 'Expenses']);
// export const ExpenseMethodsEnum = pgEnum("expense_methods_enum", ['Credit', 'Debit']);

// export const CategoriesTable = pgTable(
//     "categories",
//     {
//       id: uuid("id").primaryKey().defaultRandom(),
//       clerkUserId: text("clerk_user_id").notNull(),
//       categoryName: text("category_name").notNull(),
//       categoryBudget: numeric("category_budget", {precision: 11, scale: 2}).notNull(),
//       categoryType: TypesEnum().notNull(),
//       isFixedExpense: boolean("is_fixed_expense"),
//       createdAt,
//       updatedAt,
//     },
//     (table) => ({
//         clerkUserIdIndex: index("categories.clerk_user_id_index").on(table.clerkUserId)
//     })
// )

// export const TransactionsTable = pgTable(
//     "transactions",
//     {   
//         id: uuid("id").primaryKey().defaultRandom(),
//         clerkUserId: text("clerk_user_id").notNull(),
//         transactionDate: date("transaction_date").notNull(),
//         transactionType: TypesEnum().notNull(),
//         expenseMethod: ExpenseMethodsEnum(),
//         transactionCategory: uuid("transaction_category").references(() => CategoriesTable.id, { onDelete: "cascade" }).notNull(), // delete transaction when parent category id is deleted
//         transactionAmount: numeric("transaction_amount", {precision: 11, scale: 2}).notNull(),
//         transactionDetails: varchar("transaction_details", { length: 256 }).notNull(),
//         isClaimable: boolean("is_claimable"),
//         createdAt,
//         updatedAt,
//     },
//     (table) => ({
//         clerkUserIdIndex: index("transactions.clerk_user_id_index").on(table.clerkUserId)
//     })
// )




// Enums
const TierEnum = pgEnum("tier", Object.keys(subscriptionTiers) as [TierNames])


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
