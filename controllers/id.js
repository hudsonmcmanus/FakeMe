const { idRequestValidation } = require('../validation.js');
const axios = require('axios');

// TODO: Verify token
const getId = async (req, res) => {
    // VALIDATE DATA
    const { error } = idRequestValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    axios({
        method: 'get',
        url: 'https://api.namefake.com/',
    })
        .then(idRes => {
            console.log(idRes.data);
            res.send(idRes.data);
        })
        .catch(error => {
            console.error(error)
            res.send(error);
        })
}

module.exports.getId = getId;

const mongoose = require('mongoose');
