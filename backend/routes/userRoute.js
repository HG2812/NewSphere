const express = require("express");
const router = express.Router();
const user = require("./../models/User");
const db = require('../db');
const {jwtAuthMiddleware,generateToken} = require('../Authentication/jwt')
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const cursor = await user.findOne({email:data.email})
    if(cursor){
      res.status(400).send("user already exists");
    }
    const newUser = new user(data);
    const response = await newUser.save();
    console.log(`data saved :${response}`);
    const payload = {
      id: response._id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is:", token);
    res.status(200).json({
      message:'Registration Done!',
       token:token})
  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
   const { username, password } = req.body;
const person = await user.findOne({ username: username });

//if user doesnot exist or the password does not match, return error

if (!person || !(await person.comparePassword(password))) {
  console.log("invalid");
  alert("Invalid username or password");
  return res.status(401).json({ error: "Invalid username or password" });
}
const payload = {
  id: person._id, 
  username: person.username,
};
const token = generateToken(payload);

//return token as response
console.log({token});

// localStorage.setItem('token', token);
res.status(200).json({message:"Login Successful!",
 token:token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", (req, res) => {
  try {
   console.log("Welcome to User Dashboard!");
   res.status(200).json({message:'welcome to user profile'})

  } catch (err) {
    console.log(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = router;

