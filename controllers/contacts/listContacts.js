const Contact = require("../../models/contact");

const listContacts = async (req, res) => {
  const {_id} = req.user;
const {page = 1, limit = 10} = req.query;
const skip = (page - 1) * limit;

  const contactsList = await Contact.find({owner: _id}, "", {skip, limit: +limit}).populate("owner", "_id, email");
  res.status(200).json(contactsList);
};

module.exports = listContacts;



