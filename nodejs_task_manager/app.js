const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/index');



const app = express();

//connect to mongodb 

mongoose.connect("mongodb://localhost:27017/tasks");

//middleware

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


//routes

app.use(route);

//server config


app.listen(3000, ()=>{
    console.log("Server is started on port 3000");
})