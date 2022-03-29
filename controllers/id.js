const { IdRequestValidation } = require('../validation.js');

// TODO: Verify token
const getId = async (req, res) => {

    country_match = {
        'usa' : 'english-united-states',
        'canada' : 'english-canada',
        'russia' : 'russian-russia',
        'ukraine' : 'ukranian-ukraine',
        'poland' : 'polish-poland',
        'netherlands' : 'dutch-netherlands',
        'sweden' : 'swedish-sweden',
        'china' : 'chinese'
    }

    // VALIDATE DATA
    const { error } = IdRequestValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    extReq = {};
    if (req.body.sex) extReq.sex = req.body.sex;
    if (req.body.country) extReq.country = country_match[req.body.country];
    if (req.body.eye_color) extReq.eye_color = req.body.eye_color;
    if (req.body.hair_color) extReq.hair_color = req.body.hair_color;
    if (req.body.ethnicity) extReq.ethnicity = req.body.ethnicity;

    // TODO: Send extReq to API call and get response back
    // const queries = Object.keys(extReq)
    //      .map(key => `${extReq[key]}`)
    //      .join('/');
    // Create XMLHttpRequest and await response
    // `https://api.name-fake.com/{queries}`
    // Return response to main page

    res.send(req.body);
}

module.exports.getId = getId;

const mongoose = require('mongoose');
