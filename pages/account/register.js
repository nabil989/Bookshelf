import axios from "axios"
import { useState } from 'react'
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
        <div className='flex flex-col space-y-4 items-center'>
            <h1 className='text-5xl'>Bookshelf</h1>
            <form className='flex flex-col space-y-4' method='post'>
                <label className='block text-grey-darker text-sm font-bold mb-2'>
                    Username
                    <input onChange={e => changeEmail(e.target.value)} value={email} className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' name="username" type="text" />
                </label>
                <label className='block text-grey-darker text-sm font-bold mb-2'>
                    Password
                    <input onChange={e => changePassword(e.target.value)} value={password} className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3' name="password" type="password" />
                </label>
                <label className='block text-grey-darker text-sm font-bold mb-2'>
                    Password Again
                    <input onChange={e => changePasswordAgain(e.target.value)} value={passwordAgain} className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3' name="passwordAgain" type="password" />
                </label>
                <button className='text-red' type="submit" onClick={registerUser}>
                    <p className='text-red'>
                        Register

                    </p>
                </button>
            </form>
            <div>
                {message}
            </div>
        </div>
    );
}
 
export default Register;