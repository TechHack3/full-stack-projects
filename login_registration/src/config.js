const mongoose = require("mongoose");
const connect = mongoose.connect('mongodb://localhost:27017/formdata');

connect.then(()=>{
    console.log("Database Connected");
})
.catch(()=>{
    console.log("Database connection error");
})

//create a schema

const loginschema = new mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    password: {
        type: String,
        require: true
    }
});

const collection = new mongoose.model("users", loginschema);

module.exports = collection;