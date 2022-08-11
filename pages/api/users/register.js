import dbConnect from '../auth/lib/connect'
import bcrypt from 'bcrypt'
import Users from '../../../models/userModel'

export default async function handler (req, res) {
    await dbConnect(process.env.MONGODB_URI)
    const { email, password } = req.body
    const check = await Users.findOne({ email:email })
    if(check && check.valid) {
        console.log('a user w/ that email already exists')
        return res.status(200).json({msg:"A user with the associated email already exists."})
    } else if(!email || !password) {
        return res.status(200).json({msg:"All fields have not been filled out."})
    }
    if(check){
      await Users.deleteOne({email: email});
    }
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    const user = await Users.create({email:email, password:passwordHash})
    return res.status(200).json({
      msg: "Account has successfully been created!",
      id: user._id
    })
}