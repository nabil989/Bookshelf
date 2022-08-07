import { useSession, signIn, signOut } from "next-auth/react"
import react, {useEffect, useState} from "react"
import Link from 'next/link'
import Image from 'next/image'

export default function Profile() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true)
  }, [])
  const { data: session } = useSession()
  return (
    <div className="w-full flex flex-col items-center md:p-10">
      <div className={`w-full h-full absolute bg-white ${load ? 'opacity-0' : 'opacity-100'} transition-all duration-1000 z-10 pointer-events-none`}></div>
        <div className="text-6xl font-bold text-gray-800 mt-28">
            Bookshelf
        </div>
        <div className="text-2xl text-gray-500 mt-6">
            Your virual Bookclub
        </div>
        <div className="flex flex-row mt-10">
            <button onClick={() => signIn()} className='p-2 bg-fuchsia-200 rounded-md mr-2'>Sign in</button>
            <Link href='/account/register'>
                <button className='p-2 bg-fuchsia-200 rounded-md'>Register</button>  
            </Link>
        </div>
        <div className={`bg-gray-800 rounded-xl mt-10 p-3 shadow-2xl md:mx-40 mx-4 ${load? 'tranlate-y-0' : 'translate-y-20'} transition-all duration-1000`}>
            <img src={'/bookshelf.png'} className = ' rounded-md'/>
        </div>
      
      {/* <button className='p-2 bg-fuchsia-200 rounded-sm'>Register</button> */}

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