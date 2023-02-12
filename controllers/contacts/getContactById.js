const Contact = require("../../models/contact");

async function getContactById(contactId) {
    const data = await Contact.find({ _id: contactId });
    return data;
  };

  module.exports = getContactById;