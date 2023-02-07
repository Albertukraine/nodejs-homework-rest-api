const app = require("./app");
const { connectDatabase } = require("../nodejs-homework-rest-api/db/connectDatabase")

const start = async () => {
  try {
    await connectDatabase();

    app.listen(3000, (err) =>
      err
        ? console.error("Error at server launch", err.message)
        : console.log("Server running. Use our API on port: 3000")
    );
  } catch (err) {
    console.error(`Failed to launch application with error ${err.message}`);
  }
};

start();
