import dbConnect from '../auth/lib/connect'
import Users from '../../../models/userModel'

export default async function handler (req, res) {
    await dbConnect(process.env.MONGODB_URI)
    const { id } = req.query
    const user = await Users.findOne({_id:id})
    if(!user || user.image === ''){
        return res.json({msg:"user either doesn't exist, or doesn't have a profile pic"})
    }
    return res.json({image:user.image}) 
}