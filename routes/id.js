const router = require('express').Router();
const { getId } = require('../controllers/id');

router.get('/', getId);

module.exports = router;