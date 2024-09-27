import mongoose from 'mongoose'

const importantDocSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    file: {
        type: [],
        required: [true, 'file is required']
    }
})


export const importantDocModel = mongoose.model('importantDoc', importantDocSchema, 'importantDoc')