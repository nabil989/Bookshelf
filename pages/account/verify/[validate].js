import axios from "axios"
import { useRouter } from 'next/router'
import { useEffect, useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import CryptoJS from "crypto-js"
import ReactInputVerificationCode from 'react-input-verification-code';

// const sgMail = require('@sendgrid/mail');
// 

const Validate = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    // method to fix encryption for dynamic route value.
    const bringBackEncryption = (encryption) => {
        return encryption.toString().replace('xMl3Jk', '+' ).replace('Por21Ld', '/').replace('Ml32', '=');
    } 
    const [code, changeCode] = useState('')
    const [id, changeId] = useState('')
    const [input, setInput] = useState('')
    const [error, setError] = useState(null);
    const [send, changeSend] = useState(false)
    const [email, changeEmail] = useState('')
    const messages = {
        Valid: 'Your account has been successfully validated.',
        BadUser: 'An account with the associated email does not exist.',
        BadCode: 'Incorrect code. Please try again.'
    }
    // method that generates an n digit random number. Used for account verification.
    const generate = (n) => {
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
        if (n > max) {
            return generate(max) + generate(n - max);
        }
        max = Math.pow(10, n+add);
        var min = max/10; // Math.pow(10, n) basically
        var number = Math.floor( Math.random() * (max - min + 1) ) + min;
        return ("" + number).substring(add); 
    }
    const getNewCode = () => {
        let newCode = generate(6)
        changeCode(newCode)
        axios.post('/api/users/sendmail', {
            email: email,
            code: newCode,
        }).then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    useEffect(()=>{
        if(!router.isReady)
            return
        const codeBytes = CryptoJS.AES.decrypt(bringBackEncryption(router.query.code), '' + process.env.ENCRYPTION_KEY);
        const originalCode = codeBytes.toString(CryptoJS.enc.Utf8).toString();
        const idBytes = CryptoJS.AES.decrypt(bringBackEncryption(router.query.id), '' + process.env.ENCRYPTION_KEY);
        const originalId = idBytes.toString(CryptoJS.enc.Utf8);
        const emailBytes = CryptoJS.AES.decrypt(bringBackEncryption(router.query.find), '' + process.env.ENCRYPTION_KEY);
        const originalEmail = emailBytes.toString(CryptoJS.enc.Utf8);
        changeCode(originalCode)
        changeId(originalId)
        changeEmail(originalEmail)
        // if(send){
        //     // sendMail(email)
        //     // console.log(send + "")
        //     // axios
        //     getNewCode()
        //     changeSend(false)
        // }
    }, [router.isReady]);
    const validateUser = () => {
        if(input.length === 6){
            // setMail(true)
            axios.post('/api/users/validate', {
                code: code,
                input: input,
                id: id
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
            <div>
                {code}
            </div>
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
            <div className="flex flex-col py-4 text-center">
                <ReactInputVerificationCode
                    value={input}
                    autoFocus={true}
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
                <button onClick={() => {getNewCode()}} className=' text-blue-600 underline'>Have an account?</button>

            </div>
             : ""}
            
        </div>
    );
}
 
export default Validate;