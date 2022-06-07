import dbConnect from '../auth/lib/connect'
import BookList from '../../../models/bookListModel'

export default async function handler (req, res) {
    //prereqs
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
    return res.status(200).json({msg:"success", data:list})
}
