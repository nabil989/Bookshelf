import axios from "axios"
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
const Register = () => {
    const [email, changeEmail] = useState('')
    const [password, changePassword] = useState('')
    const [passwordAgain, changePasswordAgain] = useState('')
    const [message, changeMessage] = useState('')
    const validateEmail = (email) => {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return true
        }
        return false
    }
    const registerUser = async (e) => {
        e.preventDefault()
        if(password !== passwordAgain) {
            changePassword('')
            changePasswordAgain('')
            console.log('passwords do not match')
            changeMessage('Passwords do not match. Please try again.')
        } else if(!validateEmail(email)){
            changeEmail('')
            console.log('invalid email')
            changeMessage('Invalid email detected. Please try again.')
        } else {
            changeMessage('A verification email has been sent to your account.')
            axios.post('/api/users/register', {
                email: email,
                password: password
            }).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            changeEmail('')
            changePassword('')
            changePasswordAgain('')
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