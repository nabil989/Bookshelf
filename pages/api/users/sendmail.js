import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler (req, res) {
    const { email, code } = req.body
// }
// const sendMail = (email) => {
    // const email = user.email
    const msg = {
        to: email,
        from: 'verifiedbookshelf@gmail.com', // Use the email address or domain you verified above
        subject: 'Verify your Account',
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