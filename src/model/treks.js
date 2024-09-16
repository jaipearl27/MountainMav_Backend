import mongoose from 'mongoose'

const treksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    // slug: {
    //     type: String,
    //     required: [true, 'URL Slug is required'],
    //     unique: true,
    // },
    content: {
        type: String,
        required: [true, 'Content is requried']
    },
    banner: {
        type: [],
        required: [true, 'Banner is requried']
    },
    gallery: {
        type: []
        
    }
},{timestamps: true})

export const treksModel = mongoose.model('treks', treksSchema, 'treks')