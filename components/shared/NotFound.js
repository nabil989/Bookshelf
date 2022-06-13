import Link from "next/link"

export default function NotFound ({msg}) {
    return <div className="h-screen flex flex-col items-center justify-center align-middle space-y-4 bg-gray-50">
                <div className="text-xl text-gray-500">{msg}</div>
                <Link href={'/'}>
                    <button className="text-gray-600 p-2 bg-fuchsia-200 rounded-xl">Return Home</button>
                </Link>
            </div>
}