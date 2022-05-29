import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                username: {label: "Email", type: "text", placeholder: "a@a.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials){
                console.log(credentials.username);
                if(credentials.username === "hello"){
                    const user = {name: "hello", email:"hello@hello.com"}
                    return user;
                }
                return null;
               
            }   
            
        })
        // ...add more providers here
    ],
    session: {
        jwt:true,    
    },
    jwt:{
        secret: "hello",
        encryption: true,
    },
    pages:{
        
    }
})