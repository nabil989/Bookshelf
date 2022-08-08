import axios from "axios"
import { useRouter } from 'next/router'
import { useEffect, useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import CryptoJS from "crypto-js"
// import VerificationInput from "react-verification-input";
import ReactInputVerificationCode from 'react-input-verification-code';
import connectDB from "../../api/auth/lib/connect"

const Validate = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    // method to fix encryption for dynamic route value.
    const bringBackEncryption = (encryption) => {
        return encryption.toString().replace('xMl3Jk', '+' ).replace('Por21Ld', '/').replace('Ml32', '=');
    } 
    const [code, changeCode] = useState('')
    const [info, changeInfo] = useState('')
    const [input, setInput] = useState('')
    const [error, setError] = useState(null);
    const messages = {
        Valid: 'Your account has been successfully validated.',
        BadUser: 'An account with the associated email does not exist.',
        BadCode: 'Incorrect code. Please try again.'
    }
    useEffect(()=>{
        if(!router.isReady)
            return
        const codeBytes = CryptoJS.AES.decrypt(bringBackEncryption(router.query.code), '' + process.env.ENCRYPTION_KEY);
        const originalCode = codeBytes.toString(CryptoJS.enc.Utf8).toString();
        const infoBytes = CryptoJS.AES.decrypt(bringBackEncryption(router.query.info), '' + process.env.ENCRYPTION_KEY);
        const originalInfo = infoBytes.toString(CryptoJS.enc.Utf8);
        changeCode(originalCode)
        changeInfo(originalInfo)
    }, [router.isReady]);
    const validateUser = () => {
        if(input.length === 6){
            axios.post('/api/users/validate', {
                code: code,
                input: input,
                info: info
            }).then(function (response) {
                if(messages.Valid === response.data.msg){
                    setLoading(false);
                } else {
                    setInput('')
                    setError(response.data.msg)
                    console.log(response.data.msg)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            setInput('')
            setError("Invalid number of digits. Please try again.");
        }
    }    
    return (
        <div className='flex flex-col items-center p-12 text-3xl '>
            <div className='border-2 border-gray-200 rounded-md md:w-1/2 w-full'>
                {loading ? 
                    <div className='text-center'>
                        Please enter the verification code sent to your email.
                    </div>
                    :
                    <div className="flex flex-row">
                        <div className="bg-green-200 w-1/12 text-center py-4 mr-2 rounded-l">✓ </div>
                        <div className="py-4">Verification Successful! <button onClick={() => signIn()} className='text-blue-400 underline'>Click here to sign in</button></div>
                    </div>
                }
            </div>
            {loading ? 
            <div className="flex flex-col py-4">
                <ReactInputVerificationCode
                    value={input}
                    placeholder={null}
                    length={6}
                    onChange={(newValue) => {
                        setInput(newValue);
                        if (newValue !== "") {
                            setError(null);
                        }
                    }}
                />
                <button onClick={validateUser}>
                    Send
                </button>
                <h1>
                    {error}
                </h1>
            </div>
             : ""}
            
        </div>
    );
}
 
export default Validate;