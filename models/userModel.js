import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },

})
module.exports = mongoose.models.User || mongoose.model('User', userSchema)
// module.exports =
//     mongoose.models.Customer || mongoose.model('Customer', customerSchema);