const { v4 } = require('uuid');
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let users = [];

const getUsers = (req, res) => {
    console.log(`Users in the database: ${users}`);

    res.send(users);
}

const getUser = (req, res) => {
    res.send(req.params.id)
};

const deleteUser = (req, res) => {

    users = users.filter((user) => user.id !== req.params.id);
    res.send(`user with id ${req.params.id} has been deleted`);
};

const updateUser = (req, res) => {
    const user = users.find((user) => user.id === req.params.id);

    user.username = req.body.username;
    user.age = req.body.age;

    console.log(`username has been updated to ${req.body.username}.age has been updated to ${req.body.age}`)
};

module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
