import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'List'
    },
    join: {
        type: String,
        required: true,
    },
    users:[],
})
module.exports = mongoose.models.BookList || mongoose.model('BookList', userSchema)