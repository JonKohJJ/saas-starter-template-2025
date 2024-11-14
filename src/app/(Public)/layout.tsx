import { ReactNode } from "react";
import PublicNavBar from "./_components/PublicNavBar";
import PublicFooter from "./_components/PublicFooter";

export default function NotSignedInLayout({ children } : { children: ReactNode }) {
  return <div className="flex flex-col min-h-screen">
    <PublicNavBar />
    <div className="container flex-1 py-16 flex flex-col items-center">
      {children}
    </div>
    <PublicFooter />
  </div>
}
