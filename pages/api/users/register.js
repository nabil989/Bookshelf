import dbConnect from '../auth/lib/connect'
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
export default async function handler (req, res) {
    await dbConnect(process.env.MONGODB_URI)
    const { email, password } = req.body

    const check = await Users.findOne({ email:email })
    if(check){
        return res.status(400).json({msg:"A user with the associated email already exists."})
    }
    if(!email || !password) {
        return res.status(400).json({msg:"All fields have not been filled out."})
    }
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    const user = await Users.create({email:email, password:passwordHash})
    return res.status(200).json({msg:"Account has successfully been created!"})

}
