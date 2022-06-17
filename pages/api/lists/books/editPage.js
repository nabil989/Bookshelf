import dbConnect from '../../auth/lib/connect'
import BookList from '../../../../models/bookListModel'
import { getSession } from "next-auth/react"

export default async function handler (req, res) {
    //prereqs
    const session = await getSession({ req })
    if(!session){
        return res.status(400).json({msg:"Not Logged In"});
    }
    const {id, bookIndex, page} = req.body;
    if(!id){
        return res.status(400).json({msg:"no id"});
    }
    await dbConnect(process.env.MONGODB_URI)

    let list = await BookList.findOne({_id: id});
    if(!list){
        return res.status(400).json({msg:"Error no list found"});
    }

    let users = list.books[bookIndex].users;
    let index = -1;
    for(let i = 0; i< users.length; i++){
        if(users[i].id === session.user.id){
            index = i;
            break;
        }
    }
    
    if(index !== -1){
        list.books[bookIndex].users[index].page = page;
    }
    else{
        list.books[bookIndex].users.push({
            id:session.user.id,
            page:page
        })
    }

    list.markModified('books');
    await list.save();

    return res.status(200).json({msg:"success", data:list})
}