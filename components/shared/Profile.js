import { useSession, signIn, signOut } from "next-auth/react"
import react, {useState} from "react"
import Link from 'next/link'
import ProfileIcon from "../misc/ProfileIcon"
import Image from 'next/image'

export default function Profile() {
  const { data: session } = useSession()
  const [open, toggleOpen] = useState(false);
  // const getImage = () => {
  //   const id = session.user.id
  //   const user = Users
  // }
  if (session) {
    return (
      <div>
        <div className={`flex flex-row items-center p-2 hover:bg-slate-100 rounded-md ${open? "bg-slate-100" : "bg-transparent"} transition-all duration-500`} onClick={()=>toggleOpen(!open)}>
          <div className="mr-4">{session.user.email}</div>
          <ProfileIcon/>   
        </div>
        {open && <div className="w-screen h-screen absolute left-0 top-0" onClick={()=>toggleOpen(!open)}></div>}
        <div className={`absolute ${open? "translate-y-5 opacity-100": "opacity-0 pointer-events-none -translate-y-5"} transition-all bg-slate-100 p-2 duration-500 w-1/12 rounded-md`}>
          <div>
            <Link href={'/'}>
              <div className="p-2 cursor-pointer roudned-md transition-all hover:bg-white ">Home</div>
            </Link>
            <div className="p-2">Profile</div>
            <button onClick={() => signOut()} className="p-2">Sign out</button>
          </div>
        </div>
        
      </div>
      
    )
  }
  return (
    <div>
      <button onClick={() => signIn()} className='p-2 bg-fuchsia-200 rounded-md mr-2'>Sign in</button>
      <Link href='/account/register'>
        <a className='p-2 bg-fuchsia-200 rounded-md'>Register</a>  
      </Link>
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