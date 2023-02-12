const Contact = require("../../models/contact");





async function updateStatusContact(contactId, body) {
  const contactToUpdate = await Contact.findOneAndUpdate(
    { _id: contactId },
    { $set: body },
    { new: true }
  );
  return contactToUpdate;
}

module.exports = updateStatusContact;