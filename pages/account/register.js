import axios from "axios"
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import CryptoJS from "crypto-js"
// var CryptoJS = require('crypto-js')
const Register = () => {
    const router = useRouter()
    const [email, changeEmail] = useState('')
    const [password, changePassword] = useState('')
    const [passwordAgain, changePasswordAgain] = useState('')
    const [message, changeMessage] = useState('')
    // method to validate if an email is in the correct format or not.
    const validateEmail = (email) => {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return true
        }
        return false
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
    // method that replaces special characters in verification code. Used for creation of dynamic route.
    // Reasoning: the encryption contains '/' characters which is not allowed when making dynamic routes.
    const replaceSpecialCharacters = (encryption) => {
        return encryption.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');
    }
    // enum for API messages for readability
    const messages = {
        InvalidParams: 'All fields have not been filled out.',
        UserExists: 'A user with the associated email already exists.',
        Success: 'Account has successfully been created!'
    }
    const registerUser = async (e) => {
        e.preventDefault()
        if(password !== passwordAgain) {
            changePassword('')
            changePasswordAgain('')
            changeMessage('Passwords do not match. Please try again.')
        } else if(!validateEmail(email)){
            changeEmail('')
            changePassword('')
            changePasswordAgain('')
            changeMessage('Invalid email detected. Please try again.')
        } else {
            let code = generate(6)
            axios.post('/api/users/register', {
                email: email,
                password: password,
                code: code
            }).then(function (response) {
                // console.log(response)
                let msg = response.data.msg
                let id = null
                changeEmail('')
                changePassword('')
                changePasswordAgain('')
                if(msg !== messages.UserExists){
                    id = response.data.id
                    let cipherCode = CryptoJS.AES.encrypt(code, '' + process.env.ENCRYPTION_KEY);
                    let cipherInfo = CryptoJS.AES.encrypt(id, '' + process.env.ENCRYPTION_KEY)
                    router.push({
                        asPath: `/account/verify/${replaceSpecialCharacters(cipherCode)}`,
                        pathname:'/account/verify/validate',
                        query: { code: replaceSpecialCharacters(cipherCode), info: replaceSpecialCharacters(cipherInfo) },
                    })
                }
                changeMessage(messages.UserExists)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    return (
        <div className='flex flex-col space-y-6 items-center pt-32 text-gray-800'>
            <h1 className='text-5xl font-bold'>Bookshelf</h1>
            
            <form className='flex flex-col space-y-6' method='post'>
                <label className='block text-grey-darker text-sm font-bold'>
                    Email
                    <input onChange={e => changeEmail(e.target.value)} value={email} className='shadow-sm focus:outline-blue-400 focus:shadow-lg appearance-none border rounded w-full py-2 px-3' name="username" type="text" />
                </label>
                <label className='block text-grey-darker text-sm font-bold'>
                    Password
                    <input onChange={e => changePassword(e.target.value)} value={password} className='shadow-sm focus:outline-blue-400 focus:shadow-lg appearance-none border rounded w-full py-2 px-3' name="password" type="password" />
                </label>
                <label className='block text-grey-darker text-sm font-bold'>
                    Password Again
                    <input onChange={e => changePasswordAgain(e.target.value)} value={passwordAgain} className='shadow-sm focus:outline-blue-400 focus:shadow-lg appearance-none border rounded w-full py-2 px-3' name="passwordAgain" type="password" />
                </label>
                <button className='text-red bg-blue-300 rounded p-1' type="submit" onClick={registerUser}>
                    <p className='text-red'>
                        Register
                    </p>
                </button>
                <button onClick={() => signIn()} className=' text-blue-600 underline'>Have an account?</button>
            </form>
            {message != '' && <div className={`${message === 'A verification email has been sent to your account.' ? 'bg-green-200' : 'bg-red-200'} rounded-sm p-2`}>
                {message}
            </div>}
            
        </div>
    );
}
export default Register;