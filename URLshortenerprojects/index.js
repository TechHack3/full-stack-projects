const express=require('express');
const app=express();
const port=3001;
const urlRouter=require('./routes/url');

app.use("/url",urlRouter)

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})