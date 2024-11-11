import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { subscriptionTiers, subscriptionTiersInOrder, TierNames } from "@/data/subscriptionTiers"
import {
  createCancelSession,
  createCheckoutSession,
  createCustomerPortalSession,
} from "@/server/actions/stripe"
import { getUserSubscriptionTier } from "@/server/db/subscription"
import { getTodoCount } from "@/server/db/todos"
import { auth } from "@clerk/nextjs/server"
import { CheckIcon } from "lucide-react"
import { ReactNode } from "react"
export default async function SubscriptionPage() {

    const { userId, redirectToSignIn} = await auth()
    if (userId == null) return redirectToSignIn()

    const tier = await getUserSubscriptionTier(userId)
    const todoCount = await getTodoCount(userId)

    return <div>
        <p className="text-3xl mb-8">Your Subscription</p>

        <div className="flex flex-col gap-6">
          
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Number of Todos</CardTitle>
                <CardDescription>
                  {`${todoCount} / ${tier.maxNumberOfTodos} of todos created`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(todoCount / tier.maxNumberOfTodos) * 100} className="bg-neutral-200"/>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analytics Access</CardTitle>
                <CardDescription>
                  No Access. Upgrade your account to access your analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* This card below will only render IF there is a active subscription */}
            {tier != subscriptionTiers.Free && (
              <Card>
                <CardHeader>
                  <CardTitle>You are currently on the {tier.name} plan</CardTitle>
                  <CardDescription>
                    If you would like to upgrade, cancel, or change your payment
                    method use the button below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={createCustomerPortalSession}>
                    <Button
                      className="text-lg rounded-lg"
                      size="lg"
                    >
                      Manage Subscription
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2">
              {subscriptionTiersInOrder.map(t => (
                <PricingCard key={t.name} currentTierName={tier.name} {...t} />
              ))}
            </div>

          </div>
    </div>  
}

function PricingCard({
  name,
  priceInCents,
  maxNumberOfTodos,
  canAccessAnalytics,
  currentTierName,
}: (typeof subscriptionTiersInOrder)[number] & { currentTierName: TierNames }) {
  const isCurrent = currentTierName === name

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="font-semibold mb-8">{name}</div>
        <CardTitle className="text-xl font-bold">
          ${priceInCents / 100} /month
        </CardTitle>
        <CardDescription>
          {maxNumberOfTodos} max todos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={
            name === "Free"
              ? createCancelSession
              : createCheckoutSession.bind(null, name)
          }
        >
          <Button disabled={isCurrent} className="w-full bg-black text-white rounded hover:bg-neutral-800">
            {isCurrent ? "Current" : "Swap"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-start">
        <Feature className="font-bold">
          {`${maxNumberOfTodos} Todos`} 
        </Feature>
        <Feature>Todo Discounts</Feature>
        {canAccessAnalytics && <Feature>Advanced analytics</Feature>}
      </CardFooter>
    </Card>
  )
}

function Feature({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="flex gap-2">
      <CheckIcon />
      <span>{children}</span>
    </div>
  )
}
