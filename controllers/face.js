const { faceRequestValidation } = require('../validation.js');
const axios = require('axios')
const getRequestCount = require('./getRequestCount');

// TODO: Verify token
const getFace = async (req, res) => {
    // VALIDATE DATA
    const { error } = faceRequestValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    req.body.per_page = 1;
    console.log(req.body);


    axios({
        method: 'get',
        url: 'https://api.generated.photos/api/v1/faces',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `API-Key ${process.env.FACE_API}`
        },
        data: req.body
    })
        .then(faceRes => {
            console.log(`statusCode: ${faceRes.status}`);
            getRequestCount("face");
            const data = {
                "Faces": faceRes.data.faces[0].urls,
                "MetaData": faceRes.data.faces[0].meta
            }
            res.send(data);
        })
        .catch(error => {
            console.error(error)
            res.send(error);
        })
}

module.exports.getFace = getFace;
