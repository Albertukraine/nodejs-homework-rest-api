const express = require("express");
const router = express.Router();
const { validation, auth, upload } = require("../../middlewares");
const { userRegisterSchema, userLoginSchema } = require("../../schemas/user");
const errorHandler = require("../../helpers/index");
const { getCurrent, updateAvatar } = require("../../controllers/users/");
const { register, login, logout} = require("../../controllers/auth/index");

router.post("/signup", validation(userRegisterSchema), errorHandler(register));
router.post("/login", validation(userLoginSchema), errorHandler(login));
router.get("/current", auth, errorHandler(getCurrent));
router.post("/logout", auth, errorHandler(logout));
router.patch("/avatars",auth, upload.single("avatar"), errorHandler(updateAvatar));

module.exports = router;
