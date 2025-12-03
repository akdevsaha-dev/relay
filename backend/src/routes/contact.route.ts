import express from "express"
import { addContact, deleteContact, getAllContacts, getUser, updateContact } from "../controllers/contact.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.post("/addContact", protectRoute, addContact)
router.get("/contacts", protectRoute, getAllContacts)
router.delete("/contacts/:id", deleteContact)
router.patch("/update/:id", updateContact)
router.get("/search", getUser)

export default router