const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
        enum: ['All', 'Sound Healing', 'Spiritual Guides', 'Living & self-Transformation']
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('Blog', blogSchema)