const Contact = require("../../models/contact");


async function updateContact(contactId, body) {
    const contactToUpdate = await Contact.findOneAndUpdate(
      { _id: contactId },
      { $set: body },
      { new: true }
    );
    return contactToUpdate;
  };


module.exports = updateContact;