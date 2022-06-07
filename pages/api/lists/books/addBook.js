import dbConnect from '../../auth/lib/connect'
import BookList from '../../../../models/bookListModel'
import { getSession } from "next-auth/react"

export default async function handler (req, res) {
    //prereqs
    const session = await getSession({ req })
    if(!session){
        return res.status(400).json({msg:"Not Logged In"});
    }
    const {id, book} = req.body;
    if(!id){
        return res.status(400).json({msg:"no id"});
    }
    await dbConnect(process.env.MONGODB_URI)

    let list = await BookList.findOne({_id: id});
    list.books.push(book);
    await list.save();

    return res.status(200).json({msg:"success"})
}