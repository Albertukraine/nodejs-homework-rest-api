const User = require("../../models/user");
const {Conflict} = require('http-errors');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  if (!user) {
    await User.create({ name, email, password: hashPass });
    res.status(201).json({
      status: "success",
      message: "user registered",
      code: 201,
      data: {
        user: {
          email,
          name,
        },
      },
    });
  } else {
    throw new Conflict("Email in use");
  }
};

module.exports = register;
