import dbConnect from '../auth/lib/connect'
import BookList from '../../../models/bookListModel'
import Users from "../../../models/userModel"
import { getSession } from "next-auth/react"

const generateCode = () => {
    let s = (Math.random() + 1).toString(36).substring(7);
    return s;
}

export default async function handler (req, res) {
    //prereqs
    const session = await getSession({ req })
    if(!session){
        return res.status(400).json({msg:"Not Logged In"});
    }
    const {name} = req.body
    if(!name){
        return res.status(400).json({msg:"No booklist name provided"})
    }
    await dbConnect(process.env.MONGODB_URI)

    //generate join code
    let code = "";
    let valid = false;
    while(!valid){
        code = generateCode();
        const has = await BookList.findOne({ join:code });
        if(!has){
            valid = true;
        }
    }
    //create booklist and add user to it
    const list = await BookList.create({name:name, users:[session.user.id], join:code})
    //add booklist to user booklists
    const user = await Users.findOne({_id: session.user.id});
    user.bookLists.push(list._id);
    await user.save();

    return res.status(200).json({msg:"Added new booklist"})
}
