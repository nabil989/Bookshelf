import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()
  console.log('session', session)
  console.log('status', status)

  if (status === "authenticated") {
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


// import { useSession } from "next-auth/react"

// export default function Component() {
//   const { data: session, status } = useSession()

//   if (status === "authenticated") {
//     return <p>Signed in as {session.user.email}</p>
//   }

//   return <a href="/api/auth/signin">Sign in</a>
// }