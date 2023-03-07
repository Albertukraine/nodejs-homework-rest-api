const express = require("express");
const router = express.Router();
const { validation, auth } = require("../../middlewares");
const { userRegisterSchema, userLoginSchema, userSendMailSchema } = require("../../schemas/user");
const{errorHandler} = require("../../helpers/index");
const { getCurrent, verifyEmail, sendVerification } = require("../../controllers/users/");
const { register, login, logout} = require("../../controllers/auth/index");

router.post("/signup", validation(userRegisterSchema), errorHandler(register));
router.post("/login", validation(userLoginSchema), errorHandler(login));
router.get("/current", auth, errorHandler(getCurrent));
router.post("/logout", auth, errorHandler(logout));
router.get("/verify/:verificationToken", errorHandler(verifyEmail));
router.post('/verify', validation(userSendMailSchema), errorHandler(sendVerification));


module.exports = router;
