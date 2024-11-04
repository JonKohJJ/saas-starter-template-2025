import { SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function SignedInNavBar() {
  return (
    <div className="signed-in-navbar w-[20%] min-h-screen flex flex-col justify-between py-6 px-4">
        <div className="flex flex-col gap-2">
          <Link href="/" className="text-5xl mb-4">Logo</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/analytics">Analytics</Link>
          <Link href="/planner">Planner</Link>
          <Link href="/tracker">Tracker</Link>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/subscription">Subscription</Link>
          <UserButton showName />
          <SignOutButton />
        </div>
    </div>
  )
}
