import Home from '../components/home/Home'
import Landing from '../components/Landing'
import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from 'next/router'
// import CryptoJS from 'crypto-js'
export default function Index() {
  // const replaceSpecialCharacters = (encryption) => {
  //   return encryption.toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');
  // }
  // // method that generates an n digit random number. Used for account verification.
  // const generate = (n) => {
  //   var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
  //   if (n > max) {
  //     return generate(max) + generate(n - max);
  //   }
  //   max = Math.pow(10, n+add);
  //   var min = max/10; // Math.pow(10, n) basically
  //   var number = Math.floor( Math.random() * (max - min + 1) ) + min;
  //   return ("" + number).substring(add); 
  // }
  
  // const router = useRouter()
  const { data: session } = useSession()
  if(session){
    return (
        <Home></Home>
    )
  } 
  // else if(session) {
  //   // let code = generate(6)
  //   // let cipherCode = CryptoJS.AES.encrypt(code, '' + process.env.ENCRYPTION_KEY);
  //   // let cipherId = CryptoJS.AES.encrypt(session.user.id, '' + process.env.ENCRYPTION_KEY)
  //   router.push({
  //     asPath: `/account/verify/${replaceSpecialCharacters(cipherCode)}`,
  //     pathname:'/account/verify/validate',
  //     query: { code: replaceSpecialCharacters(cipherCode), id: replaceSpecialCharacters(cipherId) },
  //   })
  // } 
  else{
    return (
      <Landing></Landing>
    )
  }

  
}
// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if(session){
//       return {
//           redirect:{destination:'/'}
//       }
//   }
//   return {
//       props: {
//       csrfToken: await getCsrfToken(context),
//       },
//   }
// }