const Joi = require("joi");
const statusSchema = Joi.object({
  
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`
})
  
});

module.exports = statusSchema;