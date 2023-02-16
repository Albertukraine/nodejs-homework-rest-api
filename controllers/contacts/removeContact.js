const Contact = require("../../models/contact");
const {NotFound} = require('http-errors');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await Contact.findByIdAndRemove({ _id: contactId });

  if (!contactToDelete) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.status(200).json({ message: "Contact deleted" });
};

module.exports = removeContact;


