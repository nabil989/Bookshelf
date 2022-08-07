import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb.js"
import connectDB from "./lib/connect.js";
import Users from "../../../models/userModel"
import bcrypt from "bcrypt"
import signin from "../users/signin"
connectDB(process.env.MONGODB_URI)
export default NextAuth({
    // Configure one or more authentication providers
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                username: {label: "Email", type: "text", placeholder: "test@test.com"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req){
                const email = credentials.username
                const password = credentials.password
                const user = await Users.findOne({ email:email })
                if(!user || !password || !user.valid){
                    return null
                }
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) {
                    return null
                }
                console.log(user);
                const details = {
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    booklist: user.bookLists
                }
                return details
            }   
            
        }),
        // ...add more providers here
    ],
    session: {
        jwt:true,
        strategy: 'jwt'

    },
    jwt:{
        secret: "hello",
        encryption: true,
    },
    pages:{
        signIn: "/account/signin",
    }, 
    callbacks: {
        session: async ({ session, token }) => {
            
            if (session?.user) {
                session.user.id = token.uid;
                // session.user.image = token.picture
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            // token.picture = user.image
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
        },
    },

})

