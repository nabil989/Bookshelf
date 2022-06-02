import dbConnect from '../auth/lib/connect'
import BookList from '../../../models/bookListModel'
import { getSession } from "next-auth/react"

export default async function handler (req, res) {
    const session = await getSession({ req })
    if(!session){
        return res.status(400).json({msg:"Not Logged In"});
    }
    const {name} = req.body
    if(!name){
        return res.status(400).json({msg:"No booklist name provided"})
    }

    await dbConnect(process.env.MONGODB_URI)
    const list = await BookList.create({name:name, users:[session.user.id]})
    return res.status(200).json({msg:"Added new booklist "})

}
