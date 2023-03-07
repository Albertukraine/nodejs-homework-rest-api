const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
 
  try {
    const emailToSend = { ...data, from: "albertukraine@gmail.com" };
    console.log("try to send mail");
    await sgMail.send(emailToSend);
    console.log(emailToSend);
    console.log("Email sent");
    return true;
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = sendMail;
