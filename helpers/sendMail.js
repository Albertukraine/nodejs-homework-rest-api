const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
 
  try {
    const emailToSend = { ...data, from: "albertukraine@gmail.com" };
    await sgMail.send(emailToSend);
    return true;
  } catch (error) {
   
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = sendMail;
