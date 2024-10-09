const nonoid = require('nonoid');
const URL = require('../models/url');

async function generatenewshorturl(req,res)
{   
    const body = req.body;
    if(!body.url) return res.status(404).json({error: 'url is required '})
    const shortID = nanoid(8);
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.json({id: shortID});
}

module.exports = {
    generatenewshorturl,
}