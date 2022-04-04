const router = require('express').Router();
const { getId, getIds } = require('../controllers/id');

router.get('/', getId);
router.get('/getids', getIds);

module.exports = router;