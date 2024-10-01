const router = require("express").Router();
const task = require("./../models/task");

router.get("/", async (req,res)=>{
    const alltasks  = await task.find();
    res.render("index", {
        task: alltasks
    });
});

router.post("/addtask",async (req,res)=>{
    const addtask = req.body.addtask;
    const newtask =  new task({task : addtask})

    // save the task

    newtask.save()
    .then(()=>{
        console.log("Task added successfully");
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    })
 
});

router.get("/delete/:_id", (req,res)=>{
    const _id = req.params._id;
    task.deleteOne({_id:_id})
    .then(()=>{
        console.log("Task Deleted Successfully");
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    })
});


module.exports = router;