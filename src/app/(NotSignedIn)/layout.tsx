import { ReactNode } from "react";
import NotSignedInNavBar from "./_components/NotSignedInNavBar";
import NotSignedInFooter from "./_components/NotSignedInFooter";

export default function NotSignedInLayout({ children } : { children: ReactNode }) {
  return (
    <div className="container flex flex-col min-h-screen">
        <NotSignedInNavBar />
        <div className="py-4 flex-1">
          {children}
        </div>
        <NotSignedInFooter />
    </div>
  )
}
