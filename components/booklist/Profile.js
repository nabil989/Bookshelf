import { useSession, signIn, signOut } from "next-auth/react"
import react, {useState} from "react"

export default function Component() {
  const { data: session } = useSession()
  const [open, toggleOpen] = useState(false);
  
  if (session) {
    return (
      <div>
        <div className={`flex flex-row items-center p-2 hover:bg-slate-100 rounded-md ${open? "bg-slate-100" : "bg-transparent"} transition-all duration-500`} onClick={()=>toggleOpen(!open)}>
          {session.user.email}
          <div className="w-10 h-10 rounded-full bg-blue-200 ml-2"></div>
         
        </div>
        {open && <div className="w-screen h-screen absolute left-0 top-0" onClick={()=>toggleOpen(!open)}></div>}
        <div className={`absolute ${open? " translate-y-5 opacity-100": "opacity-0 pointer-events-none -translate-y-5"} transition-all bg-slate-100 p-2 duration-500 w-1/12 rounded-md`}>
          <div flex flex-col>
            <div className="p-2">Profile</div>
            <button onClick={() => signOut()} className="p-2">Sign out</button>
          </div>
        </div>
        
      </div>
      
    )
  }
  return (
    <div>
      <button onClick={() => signIn()} className='p-2 bg-fuchsia-200 rounded-sm'>Sign in</button>
    </div>
  )
}