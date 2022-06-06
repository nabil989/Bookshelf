// API to delete all users in db, for usage during dev. plz do not call!
import dbConnect from '../auth/lib/connect'
import Users from '../../../models/userModel'
export default async function handler (req, res) {
    dbConnect(process.env.MONGODB_URI)
    await Users.deleteMany({})
    return res.json({msg:'all users have been deleted'})
}