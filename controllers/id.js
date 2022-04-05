const { idRequestValidation } = require('../validation.js');
const axios = require('axios');
const getRequestCount = require('./getRequestCount');
const IdCollection = require('../model/Ids');
const jwt = require('jsonwebtoken');

// TODO: Verify token
const getId = async (req, res) => {
    // VALIDATE DATA
    const { error } = idRequestValidation(req.query);
    if (error) return res.status(400).send(error.details[0].message);
    const token = req.header('auth-token');

    country_match = {
        'usa': 'english-united-states',
        'canada': 'english-canada',
        'russia': 'russian-russia',
        'ukraine': 'ukranian-ukraine',
        'poland': 'polish-poland',
        'netherlands': 'dutch-netherlands',
        'sweden': 'swedish-sweden',
        'china': 'chinese-china'
    }
    let country = country_match[req.query.country];
    let gender = req.query.gender;

    console.log(req.query);

    const url = `https://api.namefake.com/${country}/${gender}`
    axios({
        method: 'get',
        url: url,
        data: req.body,
    })
        .then(idRes => {
            idRes.data.hair = (req.query.hair ? req.query.hair : idRes.data.hair);
            idRes.data.eye = (req.query.eye ? req.query.eye : idRes.data.eye);
            getRequestCount("id");
            new_id = new IdCollection({
                owner_token: token,
                id: idRes.data
            });
            new_id.save(function (err, res) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                }

            })
            res.send(idRes.data);
        })
        .catch(error => {
            console.error(error)
            res.status(400).send(err);
        })
}

const getIds = async (req, res) => {
    const token = req.header('auth-token');
    const ids = await IdCollection.find({ owner_token: token })
    try {
        console.log(ids);
        getRequestCount("id/getIds");
        res.send(ids);
    } catch (error) {
        console.error(error)
        res.send(error);
    }
}

module.exports.getId = getId;
module.exports.getIds = getIds;

const mongoose = require('mongoose');
