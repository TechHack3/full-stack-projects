const mongoose = require("mongoose");

const task = mongoose.Schema({
    task : {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model("task", task);