const router = require('express').Router();
const { getFace } = require('../controllers/face');

router.get('/', getFace);

module.exports = router;