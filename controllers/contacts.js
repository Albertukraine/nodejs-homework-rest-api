const fs = require("fs").promises;
const { log, Console } = require("console");
const path = require("path");
const contactsPath = path.resolve("./controllers/contacts.json");
const { v4: uuidv4 } = require("uuid");

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
  const contactList = await listContacts();
  let updatedContact;
  const updatedArray = contactList.map((contact) => {
    if (contact.id === contactId) {
      updatedContact = { ...contact, ...body };
      return updatedContact;
    }
    return contact;
  });
  await fs.writeFile(contactsPath, JSON.stringify(updatedArray), "utf8");
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
