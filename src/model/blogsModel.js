import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    slug: {
        type: String,
        required: [true, 'URL Slug is required'],
        unique: true,
    },
    content: {
        type: String,
        required: [true, 'Content is requried']
    },
    banner: {
        type: String,
        required: [true, 'Banner is requried']
    }
})

export const blogsModel = mongoose.model('blog', blogSchema)