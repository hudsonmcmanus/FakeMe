const router = require('express').Router();
const { getFace, getFaces } = require('../controllers/face');

router.get('/', getFace);
router.get('/getfaces', getFaces);

module.exports = router;