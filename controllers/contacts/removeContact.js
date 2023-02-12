const Contact = require("../../models/contact");

async function removeContact(contactId) {
    const contactToDelete = await Contact.findByIdAndRemove({ _id: contactId });
    return contactToDelete;
  };


module.exports = removeContact;  