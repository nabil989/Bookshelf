import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'guest'
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    image: {
        type: Buffer,
        default:''
    },
    bookLists : [],
    valid: {
        type: Boolean,
        default: false
    },
})
module.exports = mongoose.models.User || mongoose.model('User', userSchema)
// module.exports =
//     mongoose.models.Customer || mongoose.model('Customer', customerSchema);