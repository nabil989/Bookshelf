import dbConnect from '../auth/lib/connect'
import Users from '../../../models/userModel'
export default async function handler (req, res) {
    dbConnect(process.env.MONGODB_URI)
    const { id, name, image } = req.body
    const user = await Users.findOne({ _id:id })
    user.name = name
    user.image = image
    await user.save()
    return res.json({msg:"user details have been updated"})
}