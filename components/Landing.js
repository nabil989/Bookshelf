import {signIn} from "next-auth/react"
import {useEffect, useState, useCallback} from "react"
import Link from 'next/link'


export default function Profile() {
  const [load, setLoad] = useState(false);
  const [af, saf] = useState(false); //animate features tab // toggle when features is in view
  const features = [
    'Create shared booklists with friends',
    'Add books from Google books API',
    'View friends reading progress'
  ]
  const onScroll = useCallback(e => {
    const {pageYOffset} = window;
    console.log(pageYOffset);
    if(pageYOffset > 350){
      saf(true);
    }
    else{
      saf(false);
    }
  })
  useEffect(() => {
    setLoad(true)
    window.addEventListener("scroll", onScroll, {passive:true});
    () => window.removeEventListener("scroll", onScroll, {passive:true})
  }, [onScroll])
  return (
    <div className="w-full flex flex-col items-center md:p-10">
      <div className={`w-full h-full absolute bg-white ${load ? 'opacity-0' : 'opacity-100'} transition-all duration-1000 z-10 pointer-events-none`}></div>
        <div className="text-6xl font-bold text-gray-800 mt-28">
            Bookshelf
        </div>
        <div className="text-2xl text-gray-500 mt-6">
            Your virual Bookclub
        </div>
        <div className="flex flex-row mt-10">
            <button onClick={() => signIn()} className='p-2 bg-fuchsia-200 rounded-md mr-2'>Sign in</button>
            <Link href='/account/register'>
                <button className='p-2 bg-fuchsia-200 rounded-md'>Register</button>  
            </Link>
        </div>
        <div className={`bg-gray-800 rounded-xl mt-10 p-3 shadow-2xl md:mx-40 mx-4 ${load? 'tranlate-y-0' : 'translate-y-20'} transition-all duration-1000`}>
            <img src={'/bookshelf.png'} className = ' rounded-md'/>
        </div>
        <div className="w-full flex md:flex-row flex-col mt-28 h-screen">
          <div className="w-full md:w-1/2 h-1/2 flex flex-col items-center justify-center">
            <div className={`lg:w-1/3 md:w-1/2 h-[85%] first-letter bg-gradient-to-tr from-blue-400 to-purple-200 rounded-xl drop-shadow-[0_10px_20px_rgba(0,0,50,0.2)]
              ${af ? 'opacity-100 skew-x-6' : 'opacity-0 translate-y-20 skew-x-0'} transition-all duration-1000`}>
              <div className={`flex flex-row mt-20 ml-10 ${af ? 'w-96' : 'w-12'} transition-all duration-[1500ms]`}>
                <div className="w-12 h-12 rounded-full bg-lime-200 mr-4 shadow-2xl"></div>
                <div className=" h-12 grow rounded-lg shadow-2xl bg-gradient-to-r from-lime-200 to-green-400"></div>
              </div>
              <div className={`flex flex-row mt-10 ml-10 ${af ? 'w-64' : 'w-12'} transition-all duration-[2000ms]`}>
                <div className="w-12 h-12 rounded-full bg-orange-200 mr-4 shadow-2xl"></div>
                <div className=" h-12 grow rounded-lg shadow-2xl bg-gradient-to-r from-orange-300 to-red-400"></div>
              </div>
              <div className={`flex flex-row mt-10 ml-10 ${af ? 'w-48' : 'w-12'} transition-all duration-[2500ms]`}>
              <div className="w-12 h-12 rounded-full bg-fuchsia-200 mr-4 shadow-2xl"></div>
                <div className=" h-12 grow rounded-lg shadow-2xl bg-gradient-to-r from-fuchsia-300 to-indigo-500"></div>
              </div>
            </div>

          </div>
          <div className="w-full md:w-1/2  p-10">
            <div className="text-4xl font-bold text-gray-800">
                Features
            </div>
            <div className="flex flex-col space-y-6 mt-6"> 
              {features && features.map((feature, i) => {
                return <div className="flex flex-row" key={i}>
                    <div className="mr-4 text-2xl font-bold text-gray-600">-</div>
                    <div className="text-2xl font-bold text-gray-600">{feature}</div>
                  </div> 
              }

              )}  
            </div>
          </div>
        </div>
        
      {/* <button className='p-2 bg-fuchsia-200 rounded-sm'>Register</button> */}

    </div>
  )
}


// import { useSession } from "next-auth/react"

// export default function Component() {
//   const { data: session, status } = useSession()

//   if (status === "authenticated") {
//     return <p>Signed in as {session.user.email}</p>
//   }

//   return <a href="/api/auth/signin">Sign in</a>
// }