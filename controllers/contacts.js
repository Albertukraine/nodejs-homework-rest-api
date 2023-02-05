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
  return data;
}

async function addContact(body) {
const data = await Contact.insert(body);

  // const contactList = await listContacts();
  // const id = uuidv4();
  // const { name, email, phone } = body;
  // const newContact = { id, name, email, phone };
  // await contactList.push(newContact);
  // await fs.writeFile(contactsPath, JSON.stringify(contactList), "utf8");
  return data;
}

async function removeContact(contactId) {
  const contactList = await listContacts();
  const indexOfContact = contactList.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexOfContact === -1) {
    return null;
  }
  const [deletedContact] = contactList.splice(indexOfContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return deletedContact;
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
