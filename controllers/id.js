const { idRequestValidation } = require('../validation.js');
const axios = require('axios');

// TODO: Verify token
const getId = async (req, res) => {
    // VALIDATE DATA
    // const { error } = idRequestValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    req.body.country = !req.body.country ? 'english-united-states' : req.body.country;
    req.body.gender = !req.body.gender ? 'male' : req.body.gender;

    console.log(req.body.country);

    const url = `https://api.namefake.com/${req.body.country}/${req.body.gender}`
    axios({
        method: 'get',
        url: url,
        data: req.body,
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
