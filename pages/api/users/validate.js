import dbConnect from '../auth/lib/connect'
import Users from '../../../models/userModel'
export default async function handler (req, res) {
    await dbConnect(process.env.MONGODB_URI)
    const { code, input, info } = req.body
    if(code !== input){
        return res.status(200).json({msg: 'Incorrect code. Please try again.'})
    }
    const user = await Users.findOne({ _id:info })
    if(!user){
        return res.status(200).json({msg: 'An account with the associated email does not exist.'})
    }
    // user exists and right code was entered. time to validate!
    user.valid = true
    await user.save()
    console.log('user has been validated')
    return res.status(200).json({msg:'Your account has been successfully validated.'})
}