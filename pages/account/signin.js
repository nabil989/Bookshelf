import { getCsrfToken, getSession } from "next-auth/react"

export default function SignIn({ csrfToken }) {
  return (
    <div className='flex flex-col space-y-4 items-center'>
        <h1 className='text-5xl'>Bookshelf</h1>
        <form className='flex flex-col space-y-4' method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label >
                Username
                <input className='outline' name="username" type="text" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button type="submit">Sign in</button>
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

