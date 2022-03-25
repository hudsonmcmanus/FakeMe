const express = require('express');


const { getUsers, getUser, deleteUser, updateUser } = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

module.exports = router;