import express from 'express'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware.js'
import { contact, getAllContacts } from '../controller/contact.js'

const contactRouter = express.Router()

contactRouter.route('/').get(verifyTokenMiddleware, getAllContacts).post(contact)

export default contactRouter