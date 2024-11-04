import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NotSignedInNavBar() {
  return (
    <div className="not-signed-in-navbar py-4 flex justify-between items-center">
        <Link href="/" className="text-5xl">Logo</Link>

        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <Link href="/dashboard">Go To Dashboard</Link>
            </SignedIn>
        </div>
    </div>
    
  )
}
