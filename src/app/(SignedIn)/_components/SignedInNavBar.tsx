import BrandLogo from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function SignedInNavBar() {
  return (
    <div className="signed-in-navbar h-screen flex flex-col justify-between p-8 border-r-[1px] border-neutral-300 sticky top-0 left-0">
        <div className="mb-8">
          <BrandLogo />
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/analytics">Analytics</Link>
        </div>

        <div className="flex flex-col gap-2 mt-8">
          <ThemeToggle />
          <Link href="/subscription">Subscription</Link>
          <UserButton showName/>
        </div>
    </div>
  )
}
