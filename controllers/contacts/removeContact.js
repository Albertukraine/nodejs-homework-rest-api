const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const contactToDelete = await Contact.findOneAndRemove(id);

  if (!contactToDelete) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  res.status(200).json({ message: "Contact deleted" });
};

module.exports = removeContact;
