import express from 'express'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware.js'
import { contact, deleteContact, getAllContacts } from '../controller/contact.js'

const contactRouter = express.Router()

contactRouter.route('/').get(verifyTokenMiddleware, getAllContacts).post(contact)
contactRouter.route('/:id').delete(verifyTokenMiddleware, deleteContact)

export default contactRouter