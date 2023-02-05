const express = require("express");
const router = express.Router();
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const validateMiddleware = validation(contactSchema);

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateMiddleware, async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await removeContact(id);
    if (!result) {
      res.status(404).json({ message: `Not found contact with ID ${id}` });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const updatedContact = await updateContact(id, req.body);
    if (!updatedContact) {
      res.status(404).json({ message: `Contact with ID ${id} doesn't exist` });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next)=> {
  try {
    const id = req.params.contactId;
    const updatedContact = await updateStatusContact(id, req.body);
    const {favorite} = req.body;
    console.log("FAVORITE VALUE",favorite);
    if(!updatedContact){
      res.status(404).json({ message: `Contact with ID ${id} doesn't exist` });
    };
    if (favorite === undefined) {
      res.status(400).json({ message: `missing field favorite` });
    };
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
