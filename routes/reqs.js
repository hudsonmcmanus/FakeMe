const router = require('express').Router();
const RequestCollection = require('../model/Request');

const getRequestCollections = async (req, res) => {
    let reqs = await RequestCollection.find({});
    console.log(reqs);
    res.send(reqs);
}

router.get('/', getRequestCollections);

module.exports = router;