const User = require("../../models/user");
const { BadRequest } = require("http-errors");
const { sendMail } = require("../../helpers");
const { PORT } = process.env;
const { v4: uuidv4 } = require("uuid");

const sendVerification = async (req, res) => {
  const { email } = req.body;
  // шукаємо юзера по емейлу
  const user = await User.findOne({
    email,
  });
  // юзера не існує
  if (!user) {
    throw BadRequest("Can`t find user with this email, please register");
  }
  // юзер є і він верифікований
  if (user.verify) {
    res.json({ message: ` ${email} already verificated` });
  }
  // юзер є але невирифікований - генеруємо токен, записуємо в юзера веріфай тру, відправляємо лист з посиланням для верифікаціі
  if (!user.verify) {
    const verificationToken = uuidv4();
    await User.findOneAndUpdate(email, { verificationToken });
    const mail = {
      to: email,
      subject: "Please confirm your email",
      html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}" >Confirm email please</a>`,
    };
    await sendMail(mail);
    res.status(201).json({
      message: "Please check your email, we send email for verification",
    });
  }
};

module.exports = sendVerification;
