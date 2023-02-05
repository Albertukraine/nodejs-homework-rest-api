const Contact = require('../models/contact');

async function listContacts(req, res) {
  const data = await Contact.find({});
  return data;
}

async function getContactById(contactId) {
  const data = await Contact.find({_id: contactId});
  if (data.length === 0) {return null};
  return data;
}

async function addContact(body) {
const data = await Contact.create(body);
  return data;
}

async function removeContact(contactId) {

const contactToDelete = await Contact.remove({_id: contactId});
if (contactToDelete.length === 0) {return null};
  return contactToDelete;
}

async function updateContact(contactId, body) {
const contactToUpdate = await Contact.findOneAndUpdate({_id: contactId}, {$set: body}, {new: true});
if(!contactToUpdate) {return null};
return contactToUpdate;
}

async function updateStatusContact (contactId, body) {
const contactToUpdate = await Contact.findOneAndUpdate({_id: contactId}, {$set: body}, {new: true});
if (!contactToUpdate) {return null};
return contactToUpdate;
  
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
