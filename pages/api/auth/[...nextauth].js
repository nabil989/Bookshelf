import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb.js"
import connectDB from "./lib/connect.js";
import Users from "../../../models/userModel"
import bcrypt from "bcrypt"
connectDB(process.env.MONGODB_URI)
export default NextAuth({
    // Configure one or more authentication providers
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name:"Credentials",
            credentials: {
                username: {label: "Email", type: "text", placeholder: "test@test.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req){
                const email = credentials.username
                const password = credentials.password
                const user = await Users.findOne({email})
                if(!user || !password){
                    
                    // return res.status(400).json({msg:"An account with the specified email does not exist."})
                    return null

                }
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch){
                    // return res.status(400).json({msg:"The password is incorrect."})
                    return null
                }
                return user
                // return {name:'test', email:email}

            }   
            
        }),
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
        
    },
    database:process.env.MONGODB_URI

})

const signInUser = async({password, user}) => {
    if(!user.password){
        return res.status(400).json({msg:"Please enter a password"})
    }
    const isMatch = await bcrypt.compare(password, user)
    if(!isMatch){
        return res.status(400).json({msg:"The password is incorrect."})
    }
    return user
}