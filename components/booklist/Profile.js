import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div>
        {session.user.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={() => signIn()} className='p-2 bg-purple-200 rounded-sm'>Sign in</button>
    </div>
  )
}