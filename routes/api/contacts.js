const express = require("express");
const router = express.Router();
const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string()
  .min(3)
  .max(30)
  .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'ua'] } }),
  phone: Joi.number().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      status: "succes", 
      code: 200,
      data: {contacts}

    });
    
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "server error"
    })
  }
 
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  res.json(contact);
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await addContact(req.body);
    res.status(201).json({
      status: "succes",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await getContactById(id);
    if (result.length < 1) { res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact with ${id}`
    });
  return}
    
  await removeContact(id);
  res.status(200).json({ message: `Contact with id ${id} was deleted from contact list` });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "server error"
    })
  }
  
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await getContactById(id);
    if (result.length < 1) { res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact with ${id}`
    });
  return}

  await updateContact(id, req.body);
    
  } catch (error) {
    
  }
  res.json({ message: "template message" });
});

module.exports = router;
