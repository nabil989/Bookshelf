import dbConnect from '../auth/lib/connect'
import bcrypt from 'bcrypt'
import Users from '../../../models/userModel'
const sgMail = require('@sendgrid/mail');

export default async function handler (req, res) {
    await dbConnect(process.env.MONGODB_URI)
    const { email, password, code} = req.body
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
    const user = await Users.create({email:email, password:passwordHash, code:code})
    sendMail(user, code)
    return res.status(200).json({msg:"Account has successfully been created!"})
}
const sendMail = (user, code) => {
    const email = user.email
    const id = user._id
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: email,
        from: 'verifiedbookshelf@gmail.com', // Use the email address or domain you verified above
        subject: 'Verify Your Bookshelf Account',
        text: `Your account verification code is ${code}. If this wasn't you, please shoot us an email. Thanks!`
        // text: `Press here or visit http://localhost:3000/account/verify/${id} to verify your account. If this wasn't you please do not click the link and shoot us an email. Thanks!`,
        // html: `Press <a href="http://localhost:3000/account/verify/${id}">here</a> or visit http://localhost:3000/account/verify/${id} to verify your account.
        // If this wasn't you, please do not click the link and shoot us an email. Thanks!`
      };
      sgMail
        .send(msg)
        .then(() => {}, error => {
          console.error(error);
          if (error.response) {
            console.error(error.response.body)
          }
    });
}

// const verify = (id) => {
//   if(user){
//     user.valid = true
//     await user.save
//   } else {
//     res.json('user does not exist')
//   }
// }