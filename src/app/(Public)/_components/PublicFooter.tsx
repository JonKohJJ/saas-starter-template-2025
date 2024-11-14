import Link from "next/link";

export default function PublicFooter() {
  return (
    <div className="not-signed-in-footer py-16 flex flex-col justify-center items-center border-t bg-card text-card-foreground shadow">
        <p>© 2024 All Rights Reserved</p>
        <p>Authored by <Link className="font-medium hover:underline" href={"https://www.jonathankoh.dev/"} target="_blank">Jonathan Koh</Link>. Coded with ❤️️</p>
    </div>
  )
}

