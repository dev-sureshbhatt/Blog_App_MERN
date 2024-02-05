
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    summary: {
        type: String
    },
    content: {
        type: String
    },
    cover: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref:'user'
    }
}, {timestamps: true} )

const BLOG = new mongoose.model('Blog', blogSchema)

module.exports = BLOG