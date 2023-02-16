const Contact = require("../../models/contact");
const { NotFound } = require('http-errors');


const updateContact = async (req, res) => {
  const {contactId} = req.params;
  const updatedContact = await Contact.findOneAndUpdate({ _id: contactId }, 
    req.body, {
    new: true,
  });

  if (!updatedContact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.status(200).json(updatedContact);
};

module.exports = updateContact;
