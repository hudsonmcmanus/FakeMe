const { idRequestValidation } = require('../validation.js');
const axios = require('axios');
const getRequestCount = require('./getRequestCount');
const IdCollection = require('../model/Ids');
const jwt = require('jsonwebtoken');

// TODO: Verify token
const getId = async (req, res) => {
    // VALIDATE DATA
    // const { error } = idRequestValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    const token = req.header('auth-token');

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
            getRequestCount("id");
            console.log(token);
            new_id = new IdCollection({
                owner_token: token,
                id: idRes.data
            });
            new_id.save(function(err, res){
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(res)
                }
            })
            res.send(idRes.data);
        })
        .catch(error => {
            console.error(error)
            res.send(error);
        })
}

const getIds = async (req, res) => {
    const token = req.header('auth-token');
    const ids = await IdCollection.find({ owner_token: token })
    try {
        console.log(ids);
        res.send(ids);
    } catch (error) {
        console.error(error)
        res.send(error);
    }
}

module.exports.getId = getId;
module.exports.getIds = getIds;

const mongoose = require('mongoose');
