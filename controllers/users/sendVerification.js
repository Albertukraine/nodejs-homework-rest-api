const User = require("../../models/user");
const { BadRequest } = require("http-errors");
const { sendMail } = require("../../helpers");
const { PORT } = process.env;

const sendVerification = async (req, res) => {
  const { email } = req.body;
  const { verificationToken } = req.params;

  const userWithEmail = await User.findOne({
    email,
  });

  if (!userWithEmail) {
    throw BadRequest("Can`t find user with this email");
  }

  const userWithToken = await User.findByIdAndUpdate(
    userWithEmail,
    verificationToken
  );

  if (!userWithToken.verificationToken) {
    throw BadRequest("Verification has already been passed");
  }

  await sendMail({
    to: email,
    subject: "Please confirm your email",
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}" >Confirm email please</a>`,
  });

  res.status(201).json({
    message: "Verification email sent",
  });
};

module.exports = sendVerification;
