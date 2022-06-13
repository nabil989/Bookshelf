import dbConnect from '../auth/lib/connect'
import BookList from '../../../models/bookListModel'
import Users from "../../../models/userModel"
import { getSession } from "next-auth/react"


export default async function handler (req, res) {
    //prereqs
    const session = await getSession({ req })
    if(!session){
        return res.status(400).json({msg:"Not Logged In"});
    }
    const {code} = req.body
    if(!code){
        return res.status(400).json({msg:"No booklist join code provided"})
    }
    await dbConnect(process.env.MONGODB_URI)
    
    //find booklist with code
    const list = await BookList.findOne({join:code})
    if(!list){
        return res.status(400).json({msg:"No booklist with join code"})
    }
    if(list.users.includes(session.user.id)){
        return res.status(400).json({msg:"Already in List"})
    }
    list.users.push(session.user.id)
    await list.save();
    //add booklist to user booklists and user to booklist
    
    const user = await Users.findOne({_id: session.user.id})
    user.bookLists.push(list._id);
    await user.save();

    return res.status(200).json({msg:"joined a booklist"})
}
