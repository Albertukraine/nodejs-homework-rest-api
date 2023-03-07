const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;
const dotenv = require("dotenv");
dotenv.config();

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  console.log("try to send mail");

  const emailToSend = { ...data, from: "albertukraine@gmail.com" };
  try {
    await sgMail
      .send(emailToSend)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    return true;
  } catch (error) {
    // throw error;
  }
  // try {
  //     console.log("try to send mail");
  //     await sgMail.send(emailToSend);
  //     console.log(emailToSend);
  //     console.log("Email sent");
  //     return  true;

  // } catch (error) {
  //     console.error(error);
  //     if (error.response) {
  //         console.error(error.response.body)
  //       }
  // }
};

module.exports = sendMail;
