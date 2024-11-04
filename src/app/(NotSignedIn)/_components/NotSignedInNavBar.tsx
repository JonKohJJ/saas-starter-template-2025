import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NotSignedInNavBar() {
  return (
    <div className="not-signed-in-navbar py-4 border-[1px] border-b-black flex justify-between items-center">
        <Link href="/" className="text-5xl">Logo</Link>

        <div className="flex gap-4 items-center">
            <Link href="/dashboard">Go To Dashboard</Link>
        </div>

        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton showName />
            </SignedIn>
        </div>
    </div>
    
  )
}
