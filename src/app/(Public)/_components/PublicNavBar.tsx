import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";

export default function PublicNavBar() {
  return (
    <div className="public-navbar py-6 border-b bg-card text-card-foreground shadow">
        <div className="container flex justify-between items-center">
          <BrandLogo />
          <ThemeToggle />
        </div>
    </div>
  )
}
