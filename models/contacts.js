const fs = require("fs").promises;
const { log, Console } = require("console");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");
const { v4: uuidv4 } = require("uuid");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
  const [gottenContact] = contactList.filter((item) => item.id === contactId);
  return gottenContact;
}

async function addContact(body) {
  const contactList = await listContacts();
  const id = uuidv4();
  const { name, email, phone } = body;
  const newContact = { id, name, email, phone };
  await contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList), "utf8");
  return newContact;
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
  const updatedArray = contactList.map( (contact)=>{
if(contact.id===contactId){ updatedContact = {...contact, ...body}; return updatedContact } return contact} );
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
