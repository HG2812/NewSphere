const express = require("express");
const router = express.Router();
const download= require("./../models/downloads");

router.post("/downloads", async (req, res) => {
  try {
    const data = req.body;
    const newdownload = new download(data);
    const response = await newdownload.save();
    console.log("data saved");
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { downloadname, password } = req.body;

    const download = await download.findOne({ downloadname: downloadname });

    if (!download || !(await download.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid downloadname or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    console.log("Welcome to NewSphere!");
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;
