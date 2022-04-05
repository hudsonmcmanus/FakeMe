const UserCollection = require('../model/User');
const getRequestCount = require('./getRequestCount');
const { registerValidation, loginValidation, updateValidation, deleteValidation } = require('../validation.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const loginUser = async (req, res) => {
    // VALIDATE DATA
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF USER EXISTS ALREADY
    const user = await UserCollection.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does not exist');

    // CHECK PASSWORD
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password is not correct');

    // UPDATE REQUEST COUNT
    getRequestCount("auth/login");

    res.header('auth-token', user.token).send(user.token);
}

const deleteUser = async (req, res) => {
    const { error } = deleteValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF USER EXISTS
    const user = await UserCollection.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does not exist');

    // CHECK PASSWORD
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password is not correct');

    try {
        await UserCollection.deleteOne(
            { _id: user._id }
        );
        getRequestCount('auth/delete');
        res.send("User Deleted!");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

}

const updateUser = async (req, res) => {
    const { error } = updateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF USER EXISTS
    const user = await UserCollection.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does not exist');

    // CHECK PASSWORD
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password is not correct');
    const salt = await bcrypt.genSalt(10);

    try {
        const new_user = await UserCollection.updateOne(
            { _id: user._id },
            {
                $set: {
                    email: (req.body.newEmail ? req.body.newEmail : user.email),
                    name: (req.body.newName ? req.body.newName : user.name),
                    password: (req.body.newPassword ? await bcrypt.hash(req.body.newPassword, salt) : user.password)
                }
            }
        );
        getRequestCount('auth/update');
        res.send("User Updated!");
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }

}

const createUser = async (req, res) => {
    // VALIDATE DATA
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF USER EXISTS ALREADY
    const emailExist = await UserCollection.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    const user = new UserCollection({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        token: jwt.sign({ _id: req.body.email }, process.env.TOKEN_SECRET)
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);

    } catch (err) {
        res.status(400).send(err);
    }

    // UPDATE REQUEST COUNT
    getRequestCount("auth/register");

    console.log(`User [${user.email}] added to the database.`);
};


module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;