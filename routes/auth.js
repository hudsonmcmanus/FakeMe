const express = require('express');


const { loginUser, createUser, updateUser } = require('../controllers/auth');

const router = express.Router();

router.post('/register', createUser);

router.post('/login', loginUser);

router.patch('/update', updateUser);

module.exports = router;