import axios from "axios"
import { useRouter } from 'next/router'
import { useEffect } from 'react'
// import validate from '../../api/users/validate'
const Validate = () => {
    const router = useRouter()

    useEffect(()=>{
        if(!router.isReady)
            return
        // codes using router.query
        const validateUser = async () => {
            const { validate } = router.query
            axios.post('/api/users/validate', {
                id:validate
            }).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        validateUser()
    }, [router.isReady]);
    
    return (
        <div className=''>
            <h1>You have been successfully verified and will be redirected to the login screen shortly.</h1>
        </div>
    );
}
 
export default Validate;