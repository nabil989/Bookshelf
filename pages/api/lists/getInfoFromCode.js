import dbConnect from '../auth/lib/connect'
import BookList from '../../../models/bookListModel'
import { getSession } from "next-auth/react"

export default async function handler (req, res) {
    //prereqs
    const session = await getSession({ req })
    const {join} = req.body
    console.log(join);
    if(!join){
        return res.status(400).json({msg:"No join code provided"});
    }

    await dbConnect(process.env.MONGODB_URI)

    let list = await BookList.findOne({join: join});
    
    if(!list){
        return res.status(400).json({msg:"No List with join code found"});
    }

    if(session){
        if(list.users.includes(session.user.id)){
            return res.status(200).json({msg:"Already in List", data:list})
        }
    }
    return res.status(200).json({msg:"success", data:list})
}
