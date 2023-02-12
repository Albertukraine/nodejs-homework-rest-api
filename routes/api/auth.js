const express = require("express");
const router = express.Router();
const { validation } = require("../../middlewares");
const { userRegisterSchema } = require("../../schemas/user");

const { auth: ctrl} = require('../../controllers')

router.post("/signup", validation(userRegisterSchema), ctrl.register);

module.exports = router;
