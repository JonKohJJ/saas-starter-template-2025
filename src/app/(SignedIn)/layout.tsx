import { ReactNode } from "react";
import SignedInNavBar from "./_components/SignedInNavBar";

export default function SignedInLayout({ children } : { children: ReactNode }) {
  return (
    <div className="container flex">
        <SignedInNavBar />
        <div className="w-[80%]">
          {children}
        </div>
    </div>
  )
}
