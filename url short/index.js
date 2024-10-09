const express = require('express');
const urlroute = require('./routes/url');
const app = express();
const PORT = 3001;

app.use('/url',urlroute);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});