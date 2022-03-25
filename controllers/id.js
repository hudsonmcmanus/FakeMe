const { IdRequestValidation } = require('../validation.js');

// TODO: Verify token
const getId = async (req, res) => {
    // VALIDATE DATA
    const { error } = IdRequestValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    extReq = {};
    if (req.body.sex) extReq.sex = req.body.sex;
    if (req.body.country) extReq.country = req.body.country;
    if (req.body.eye_color) extReq.eye_color = req.body.eye_color;
    if (req.body.hair_color) extReq.hair_color = req.body.hair_color;
    if (req.body.ethnicity) extReq.ethnicity = req.body.ethnicity;

    // TODO: Send extReq to API call and get response back

    res.send(req.body);
}

module.exports.getId = getId;

const mongoose = require('mongoose');
