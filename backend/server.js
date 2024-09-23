const express = require('express');
require('dotenv').config();
const passport = require("./Authentication/Auth");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const userRoute = require("./routes/userRoute");
const bookmarkRoute = require("./routes/bookmarkRoute");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
//setting up port

const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;
app.use(passport.initialize()); //to initialize passport(middleware)
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("Hello World...Welcome to NewSphere?");
});

function fetchNews(url, res) {
  axios
    .get(url)
    .then((response) => {
      if (response.data.totalResults > 0) {
        res.json({
          status: 200,
          success: true,
          message: "Successfully fetched the data",
          data: response.data,
        });
      } else {
        res.json({
          status: 404,
          success: true,
          message: "No more results to show",
        });
      }
    })
    .catch((error) => {
      res.json({
        status: 500,
        success: false,
        message: "Error fetching the data",
        error: error.message,
      });
    });
}

//routes for news

app.get("/all-news", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 40;
  let page = parseInt(req.query.page) || 1;
  let url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

//route for top headlines

app.options('/top-headlines',cors())
app.get('/top-headlines',(req,res)=>{
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "business";
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}&language=en&apiKey=${API_KEY}`
    fetchNews(url,res);
})

//country
app.options('/country/:iso',cors())
app.get('/country/:iso',(req,res)=>{
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "business";
    let country= req.params.iso || "in";
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}&country=${country}&language=en&apiKey=${API_KEY}`
    fetchNews(url,res);
})  

app.use("/user", userRoute);
app.use("/bookmarks", bookmarkRoute);

app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}`);
});

