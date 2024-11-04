import Link from "next/link";

export default function SignedInNavBar() {
  return (
    <div className="signed-in-navbar border-[1px] border-r-black w-[20%]">
        <Link href="/" className="text-5xl">Logo</Link>
        <p>Signed In Nav Bar</p>
    </div>
  )
}
