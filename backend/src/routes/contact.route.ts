import express from "express"
import { addContact, deleteContact, getAllContacts, getUser, updateContact } from "../controllers/contact.controller.js"

const router = express.Router()

router.post("/addContact", addContact)
router.get("/contacts/:ownerId", getAllContacts)
router.delete("/contacts/:id", deleteContact)
router.patch("/update/:id", updateContact)
router.get("/search", getUser)

export default router