import dbConnect from '../auth/lib/connect'
import BookList from '../../../models/bookListModel'
import Users from "../../../models/userModel"

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
    let ret = {};

    for(let i = 0; i< list.users.length; i++){
        const user = await Users.findOne({_id: list.users[i]});
        ret[i] = {name: user.name, image: user.image, id:user._id};
    }
    return res.status(200).json({msg:"success", data:{list}, users:{ret}});
}
