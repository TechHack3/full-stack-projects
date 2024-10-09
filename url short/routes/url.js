const express = require('express');
const generatenewshorturl = require('generatenewshorturl');
const router = express.Router();

router.post('/',generatenewshorturl);

model.exports = router;