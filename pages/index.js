import Home from '../components/home/Home'
import Landing from '../components/Landing'
import { useSession, signIn, signOut } from "next-auth/react"
export default function Index() {
  const { data: session } = useSession()
  if(session){
    return (
      <Home></Home>
    )
  }
  else{
    return (
      <Landing></Landing>
    )
  }

  
}
