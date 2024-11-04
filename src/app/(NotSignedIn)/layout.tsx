import { ReactNode } from "react";
import NotSignedInNavBar from "./_components/NotSignedInNavBar";
import NotSignedInFooter from "./_components/NotSignedInFooter";

export default function NotSignedInLayout({ children } : { children: ReactNode }) {
  return (
    <div className="container">
        <NotSignedInNavBar />
        <div>
          {children}
        </div>
        <NotSignedInFooter />
    </div>
  )
}
