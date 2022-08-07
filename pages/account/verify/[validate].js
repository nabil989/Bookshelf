import axios from "axios"
import { useRouter } from 'next/router'
import { useEffect, useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
// import validate from '../../api/users/validate'
const Validate = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        if(!router.isReady)
            return
        // codes using router.query
        const validateUser = async () => {
            const { validate } = router.query
            axios.post('/api/users/validate', {
                id:validate
            }).then(function (response) {
                setLoading(false);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        validateUser()
    }, [router.isReady]);
    
    return (
        <div className='flex flex-col items-center p-4'>
            <div className='border-2 border-gray-200 rounded-md md:w-1/2 w-full'>
                {loading ? 
                    <div>
                        Loading...
                    </div>
                    :
                    <div className="flex flex-row">
                        <div className="bg-green-200 w-1/12 text-center py-4 mr-2 rounded-l">✓ </div>
                        <div className="py-4">Verification Successful! <button onClick={() => signIn()} className='text-blue-400 underline'>Click here to sign in</button></div>
                    </div>
                }
                
            </div>
        </div>
    );
}
 
export default Validate;