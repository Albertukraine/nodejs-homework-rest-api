const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");
const { v4: uuidv4 } = require("uuid");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  console.log(data);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
  const gottenContact = contactList.filter((item) => item.id === contactId);
  return gottenContact;
}

async function addContact(body) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
  const id = uuidv4();
  const { name, email, phone } = body;
  const newContact = { id, name, email, phone };
  await contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList), "utf8");
  return contactList;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
  const indexOfContact = contactList.findIndex(
    (contact) => contact.id === contactId
  );
  console.log("indexOfContact", indexOfContact);
  await contactList.splice(indexOfContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return contactList;
}

async function updateContact(contactId, body) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
  const [contactToUpdate] = contactList.filter((item) => item.id === contactId);
  contactToUpdate.name = body.name;
  contactToUpdate.email = body.email;
  contactToUpdate.phone = body.phone;
  await fs.writeFile(contactsPath, JSON.stringify(contactList), "utf8");
  return contactList;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

//
