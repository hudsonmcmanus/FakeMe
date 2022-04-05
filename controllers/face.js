const { faceRequestValidation } = require('../validation.js');
const axios = require('axios')
const getRequestCount = require('./getRequestCount');
const FaceCollection = require('../model/Faces');
const jwt = require('jsonwebtoken');

function serialize(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

// TODO: Verify token
const getFace = async (req, res) => {
    // VALIDATE DATA
    const token = req.header('auth-token');
    const { error } = faceRequestValidation(req.query);
    if (error) return res.status(400).send(error.details[0].message);
    req.query.per_page = 1;

    let params = serialize(req.query)
    console.log(params);

    axios({
        method: 'get',
        url: 'https://api.generated.photos/api/v1/faces/?' + params,
        headers: {
            'Authorization': `API-Key ${process.env.FACE_API}`
        },
        data: {}
    })
        .then(faceRes => {
            console.log(faceRes.data);
            getRequestCount("face");
            const data = {
                "Faces": faceRes.data.faces[0].urls,
                "MetaData": faceRes.data.faces[0].meta
            }
            new_face = new FaceCollection({
                owner_token: token,
                faces: faceRes.data.faces[0].urls
            });
            new_face.save(function (err, res) {
                if (err) {
                    res.status(400).send(err)
                    console.log(err);
                }
                else {
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
        getRequestCount("face/getFaces");
        res.send(faces);
    } catch (error) {
        console.error(error)
        res.status(400).send(error)
    }
}

module.exports.getFace = getFace;
module.exports.getFaces = getFaces;
