const Contact = require("../../models/contact");


async function addContact(body) {
    const data = await Contact.create(body);
    return data;
  };


module.exports = addContact;  