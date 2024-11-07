import { ReactNode } from "react";
import SignedInNavBar from "./_components/SignedInNavBar";

export default function SignedInLayout({ children } : { children: ReactNode }) {
  return (
    <div className="flex">
        <SignedInNavBar />
        <div className="flex w-full justify-center">
          <div className="w-full max-w-[1300px] p-8 border-x-[1px] border-neutral-300">
            {children}
          </div>
        </div>
    </div>
  )
}
