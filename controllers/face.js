const { faceRequestValidation } = require('../validation.js');

// TODO: Verify token
const getFace = async (req, res) => {
    // VALIDATE DATA
    const { error } = faceRequestValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    extReq = {};
    if (req.body.emotion) extReq.emotion = req.body.emotion;
    if (req.body.sex) extReq.sex = req.body.sex;
    if (req.body.age) extReq.age = req.body.age;
    if (req.body.ethnicity) extReq.ethnicity = req.body.ethnicity;
    if (req.body.eye_color) extReq.eye_color = req.body.eye_color;
    if (req.body.hair_color) extReq.hair_color = req.body.hair_color;
    if (req.body.hair_length) extReq.hair_length = req.body.hair_length;

    // TODO: Send extReq to API call and get response back

    res.send(req.body);
}

module.exports.getFace = getFace;
