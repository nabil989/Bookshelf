import { getCsrfToken, getSession } from "next-auth/react"

export default function SignIn({ csrfToken }) {
  return (
    <div className='flex flex-col space-y-4 items-center'>
        <h1 className='text-5xl'>Bookshelf</h1>
        <form className='flex flex-col space-y-4' method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label className='block text-grey-darker text-sm font-bold mb-2'>
                Username
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' name="username" type="text" />
            </label>
            <label className='block text-grey-darker text-sm font-bold mb-2'>
                Password
                <input className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3' name="password" type="password" />
            </label>

            <button className='text-red' type="submit">
                {/* <div className='bg-blue hover:bg-blue-dark  font-bold py-2 px-4 rounded'> */}
                Sign In

                {/* </div> */}
            </button>

            
            {/* <div className="flex items-center justify-between">
                
                <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
                    Forgot Password?
                </a>
            </div> */}
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

