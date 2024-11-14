import BrandLogo from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function ProtectedNavBar() {
  return (
    <div className="signed-in-navbar h-screen flex flex-col justify-between p-8 sticky top-0 left-0 border-r bg-card text-card-foreground shadow">
        
        <BrandLogo />

        <div className="flex flex-col gap-6 flex-1 py-12">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/analytics">Analytics</Link>
        </div>

        <div className="flex flex-col gap-6">
          <Link href="/subscription">Subscription</Link>
          <div className="flex">
            <ThemeToggle />
            <UserButton showName />
          </div>
        </div>

    </div>
  )
}
