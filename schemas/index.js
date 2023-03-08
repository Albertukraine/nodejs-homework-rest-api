const contactSchema = require("./contact");
const statusSchema = require("./status");
const { userRegisterSchema, userSendMailSchema } = require("./user");



module.exports = { contactSchema, statusSchema, userRegisterSchema, userSendMailSchema };
