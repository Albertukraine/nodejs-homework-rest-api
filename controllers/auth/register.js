const User = require("../../models/user");
const {Conflict} = require('http-errors');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  if (!user) {
    const avatarURL = gravatar.url(email);
    await User.create({ name, email, avatarURL, password: hashPass });
    res.status(201).json({
      status: "success",
      message: "user registered",
      code: 201,
      data: {
        user: {
          email,
          avatarURL,
        },
      },
    });
  } else {
    throw new Conflict("Email in use");
  }
};

module.exports = register;
