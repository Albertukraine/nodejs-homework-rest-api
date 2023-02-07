const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const { DB_HOST } = process.env;

const connectDatabase = async () => {
  try {
    const mongoDb = await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
    return mongoDb;
  } catch (error) {
    console.error("Error while connecting to mongoDb.", error.message);
    process.exit(1);
  }
};

module.exports = { connectDatabase };
