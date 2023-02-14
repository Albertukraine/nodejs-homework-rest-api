const express = require("express");
const router = express.Router();
const { auth, validation } = require("../../middlewares");
const { contactSchema, statusSchema } = require("../../schemas");
const errorHandler = require("../../helpers/index");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts/index");

router.get("/", errorHandler(listContacts));

router.get("/:contactId", errorHandler(getContactById));

router.post("/", auth, validation(contactSchema), errorHandler(addContact));

router.delete("/:contactId", errorHandler(removeContact));

router.put("/:contactId", errorHandler(updateContact));

router.patch(
  "/:contactId/favorite",
  validation(statusSchema),
  errorHandler(updateStatusContact)
);

module.exports = router;
