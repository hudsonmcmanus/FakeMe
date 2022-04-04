const express = require('express');


const { loginUser, createUser, updateUser, deleteUser } = require('../controllers/auth');

const router = express.Router();

router.post('/register', createUser);

router.post('/login', loginUser);

router.patch('/update', updateUser);

router.delete('/delete', deleteUser);

module.exports = router;