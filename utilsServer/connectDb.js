const mongoose = require("mongoose");

const keys = require("../config/keys");

function connectDb() {
  try {
    mongoose.set("strictQuery", false);
    const options = {
    }
    mongoose.connect(keys.mongoURI, options);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDb;
