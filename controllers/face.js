const { faceRequestValidation } = require('../validation.js');
const axios = require('axios')
const getRequestCount = require('./getRequestCount');
const FaceCollection = require('../model/Faces');
const jwt = require('jsonwebtoken');

// TODO: Verify token
const getFace = async (req, res) => {
    // VALIDATE DATA
    const token = req.header('auth-token');
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
            new_face = new FaceCollection({
                owner_token: token,
                faces: faceRes.data.faces[0].urls
            });
            new_face.save(function(err, res){
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(res)
                }
            })
            res.send(data);
        })
        .catch(error => {
            console.error(error)
            res.send(error);
        })
}

const getFaces = async (req, res) => {
    const token = req.header('auth-token');
    const faces = await FaceCollection.find({ owner_token: token })
    try {
        console.log(faces);
        res.send(faces);
    } catch (error) {
        console.error(error)
        res.send(error);
    }
}

module.exports.getFace = getFace;
module.exports.getFaces = getFaces;
