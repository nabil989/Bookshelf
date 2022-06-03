import { useSession } from "next-auth/react"
const Register = () => {
    const { data: session } = useSession()
    return (
        <div>
            
        </div>
    );
}
 
export default Register;