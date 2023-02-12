const Contact = require("../../models/contact");

async function listContacts(req, res) {
    const data = await Contact.find({});
    return data;
  }

  module.exports = listContacts;