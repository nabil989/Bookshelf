import dbConnect from '../auth/lib/connect'
import Users from '../../../models/userModel'
export default async function handler (req, res) {
    const { id } = req.body
    dbConnect(process.env.MONGODB_URI)
    const user = await Users.findOne({ _id:id })
    // console.log('test')
    if(user){
        user.valid = true
        await user.save()
        console.log('user has been validated')
        return res.json({msg:'user has successfully been validated'})
    } else {
        console.log('no user')
        return res.json({msg:'user does not exist'})
    }
}