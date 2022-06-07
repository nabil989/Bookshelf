import dbConnect from '../auth/lib/connect'
import BookList from '../../../models/bookListModel'

export default async function handler (req, res) {
    //prereqs
    const {id} = req.body
    if(!id){
        return res.status(400).json({msg:"No ID provided"});
    }
    await dbConnect(process.env.MONGODB_URI)


    let list = await BookList.findOne({_id: id});
    if(!list){
        return res.status(400).json({msg:"No list with id found"});
    }
    return res.status(200).json({msg:"success", data:list})
}
