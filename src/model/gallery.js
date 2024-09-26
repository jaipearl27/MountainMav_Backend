import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema({

    file: {
        type: [],
        required: [true, 'file is required']
    }
})


export const galleryModel = mongoose.model('gallery', gallerySchema, 'gallery')