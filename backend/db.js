const mongoose = require("mongoose");
require("dotenv").config();
//const mongoURL = "mongodb://0.0.0.0:27017/NewSphere";
const mongoURL= process.env.MONGO_URL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => {
  console.log("connected to mongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDb connection error:", err);
});

db.on("disconnected", () => {
  console.log("disconnected from mongoDB server");
});

module.exports = db;
