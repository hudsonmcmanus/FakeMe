const express = require('express');


const { loginUser, createUser } = require('../controllers/auth');

const router = express.Router();

router.post('/register', createUser);

router.post('/login', loginUser);

module.exports = router;