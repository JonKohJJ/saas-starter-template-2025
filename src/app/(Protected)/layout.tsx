import { ReactNode } from "react";
import ProtectedNavBar from "./_components/ProtectedNavBar";

export default function SignedInLayout({ children } : { children: ReactNode }) {
  return (
    <div className="flex">
        <ProtectedNavBar />
        <div className="flex w-full justify-center">
          <div className="w-full max-w-[1300px] p-8">
            {children}
          </div>
        </div>
    </div>
  )
}
