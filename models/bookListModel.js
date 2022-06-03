import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'List'
    },
    users:[],


})
module.exports = mongoose.models.BookList || mongoose.model('BookList', userSchema)