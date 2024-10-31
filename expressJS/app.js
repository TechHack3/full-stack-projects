//IMPORT PACKAGES
const express = require('express');
const fs=require('fs');
const morgan = require('morgan');
const moviesRouter= require('./Routes/moviesRoutes');

//Route = Http Method + URL
// app.get('/',(request,response)=>
// {
// //    response.status(200).send('<h1>Hello from express server</h1>');
// response.status(200).json({message:'Hello World',status:200});
// });
// app.post('/',(request,response)=>
// {
   
// });

let app = express();

const logger = function(req,res,next)
{
    console.log("Custom Middleware Called")
    next();
}

//Framework/Middleware
app.use(express.json());
if(process.env.NODE_ENV=== 'development')
{
    app.use(morgan('dev'));
}
app.use(express.static('./public'))
app.use(logger);

//USING ROUTES
app.use('/api/v1/movies',moviesRouter);

module.exports=app;