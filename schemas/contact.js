const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua"] },
    })
    .required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
});

module.exports = contactSchema;
