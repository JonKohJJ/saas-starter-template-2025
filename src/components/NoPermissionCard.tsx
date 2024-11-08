import Link from "next/link"
import { Button } from "./ui/button"
import { ReactNode } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "./ui/card"

export function NoPermissionCard({
  children = "You do not have permission to perform this action. Try upgrading your account to access this feature.",
}: {
  children?: ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Permission Denied</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{children}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="/subscription">Upgrade Account</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}