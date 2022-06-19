import { getCsrfToken, getSession } from "next-auth/react"
import Link from "next/link"
export default function SignIn({ csrfToken }) {
  return (
    <div className='flex flex-col space-y-4 items-center pt-32 text-gray-800'>
        <h1 className='text-5xl font-bold'>Bookshelf</h1>
        <form className='flex flex-col space-y-4' method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label className='block text-sm font-bold mb-2'>
                Email
                <input className='shadow-sm focus:outline-blue-400 focus:shadow-lg appearance-none border rounded w-full py-2 px-3' name="username" type="text" />
            </label>
            <label className='block text-sm font-bold mb-2'>
                Password
                <input className='shadow-sm focus:outline-blue-400 focus:shadow-lg appearance-none border border-red rounded w-full py-2 px-3 mb-3' name="password" type="password" />
            </label>

            <button className='text-red bg-blue-300 rounded p-1' type="submit">
                Sign In
            </button>
            <Link href='/account/register'>
                <div>New User? <a className='text-blue-500 underline cursor-pointer'>Create an Account</a> </div> 
            </Link>
        </form>
    </div>
  )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(session){
        return {
            redirect:{destination:'/'}
        }
    }
    return {
        props: {
        csrfToken: await getCsrfToken(context),
        },
    }
}

