const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
title: {
type: String,
required:true
},
author :{
    type: String,
},
publication_date: {
     type: Date
},
content: {
     type: String,
     required: true 
},
url: {
    type: String,
    required:true,
    unique: true
},
downloaded_at: { 
    type: Date,
    default: Date.now 
},
category:{
    type: String,
    required:true
},
username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
})

const download = mongoose.model("user", downloadSchema);
module.exports = download;