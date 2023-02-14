const express = require("express");
const router = express.Router();
const { validation, auth } = require("../../middlewares");
const { userRegisterSchema, userLoginSchema } = require("../../schemas/user");
const errorHandler = require("../../helpers/index");
const { getCurrent } = require("../../controllers/users/");
const { register, login } = require("../../controllers/auth/index");

router.post("/signup", validation(userRegisterSchema), errorHandler(register));
router.post("/login", validation(userLoginSchema), errorHandler(login));
router.get("/current", auth, errorHandler(getCurrent));

module.exports = router;
