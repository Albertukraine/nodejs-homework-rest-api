// const { Conflict } = require("http-errors");
const User = require("../../models/user");

const register = async (req, res) => {
  console.log("REGISTER CONTROLLER HERE");
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  // if(user) { throw new Conflict(`User with ${email} is already exist`)};
  if (user) {
    res.status(409).json({ message: "Email in use" });
  }
  if (!user) {
    await User.create({ name, email, password });
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
  }
};

module.exports = { register };
