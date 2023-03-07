const User = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { sendMail } = require("../../helpers/index");
const { PORT } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  if (!user) {
    const avatarURL = gravatar.url(email);

    const verificationToken = uuidv4();
    const mail = {
      to: email,
      subject: "Подтвердите регистрацию",
      html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}" >Подтвердите Емейл</a>`,
    };
    
    await User.create({
      name,
      email,
      avatarURL,
      verificationToken,
      password: hashPass,
    });
    await sendMail(mail);
    res.status(201).json({
      status: "success",
      message: "user registered",
      code: 201,
      data: {
        user: {
          email,
          avatarURL,
          verificationToken,
        },
      },
    });
  } else {
    throw new Conflict("Email in use");
  }
};

module.exports = register;
