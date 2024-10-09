const mongoose = require('mongoose');
const urlschema = new mongoose.Schema({
    shortid: {
        type: 'string',
        required: true,
        unique: true

    },
    redirecturl: {
        type: 'string',
        required: true
    },
    totalcount : [{
        timestamp: {type: 'number', required: true},
         
    }]
},
{
    timestamps: true 
}

);
module.exports = mongoose.model("URL",urlschema);