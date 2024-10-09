const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Ensure the correct model is imported
const multer = require('multer');
const fs = require('fs');

// Image upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

const upload = multer({ storage: storage }).single("image");

// Insert end user into database route
router.post('/add', upload, async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a file' });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
        password: req.body.password
    });

    try {
        await user.save();
        req.session.message = {
            type: 'success',
            message: 'User added successfully',
        };
        res.redirect("/");
    } catch (err) {
        res.json({ message: err });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', {
            title: 'User Management System',
            users: users,
        });
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/add', (req, res) => {
    res.render('add_user', { title: 'Add User' });
});

router.get('/edit/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let user = await User.findById(id);
        if (user == null) {
            res.redirect('/');
        } else {
            res.render('edit_user', { title: 'Edit User', user: user });
        }
    } catch (err) {
        res.redirect('/');
    }
});

//update user route

router.post('/update/:id', upload, async (req,res)=>{
    let id = req.params.id;
    let new_image = null;
    if(req.file)
        {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        }
        else
        {
            new_image = req.body.old_image;
        }
        
    try {
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image,
            password: req.body.password
        });

        req.session.message = { 
            type: 'success',
            message: 'User updated successfully',
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
