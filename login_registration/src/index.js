const express = require('express');
const paht = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.set('view engine','ejs')

app.use(express.static("public"));

app.get('/', (req,res)=>{
     res.render("login")
});
app.get('/signup', (req,res)=>{
    res.render("signup")
});
app.get('/home', (req,res)=>{
    res.render("home")
})

app.post("/signup", async (req,res)=>{
    const data = {
        username:req.body.username,
        password:req.body.password,
    }

    const existinguser = await collection.findOne({
        username : data.username
    })

    if(existinguser)
    {
         res.send("user already exist");
    }
    else{
        const saltround = 10;
        const hashedpassword = await bcrypt.hash(data.password, saltround);
        data.password = hashedpassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.redirect('/')
        
    }


})


app.post('/', async (req,res)=>{
    try{
        const check = await collection.findOne({username: req.body.username})
        if(!check){
            res.send("user name cannot found");
        }

        const ispasswordmatch = await bcrypt.compare(req.body.password, check.password)
        if(ispasswordmatch)
        {
            res.render('home');
        }else{
            res.send("wrong password");
        }
    }catch{
        res.send("wrong details");
    }
})

const port = 5000;
app.listen(port, ()=>{
    console.log('server is running');
}) 