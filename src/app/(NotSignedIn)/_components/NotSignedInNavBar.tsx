import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";

export default function NotSignedInNavBar() {
  return (
    <div className="not-signed-in-navbar py-6 flex justify-between items-center border-b-[1px] border-neutral-300">
        <BrandLogo />

        <div className="flex gap-2">
            <ThemeToggle />
            <SignedOut>
                <Button variant="outline" className="rounded">
                  <SignInButton />
                </Button>
            </SignedOut>
            <SignedIn>
                <Link href="/dashboard"><Button variant="outline" className="rounded">Go To Dashboard<ArrowRight /></Button></Link>
            </SignedIn>
        </div>
    </div>
    
  )
}
