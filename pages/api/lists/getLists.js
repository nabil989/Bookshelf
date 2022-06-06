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
    await dbConnect(process.env.MONGODB_URI)

    let ret = {};

    const user = await Users.findOne({_id: session.user.id});
    for(let i = 0; i< user.bookLists.length; i++){
        let list = await BookList.findOne({_id: user.bookLists[i]});
        ret[i] = list;
    }

    return res.status(200).json({msg:"success", data:ret})
}
