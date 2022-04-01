const UserCollection = require('../model/User');
const RequestCount = require('../model/RequestCount');
const { registerValidation, loginValidation } = require('../validation.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Will return the Request count from RequestCount collection for the corresponding request.
const getRequestCount = async (request) => {
    const requestCount = await RequestCount.findOne({ request: request });

    if (!requestCount) {
        requestCount = new RequestCount({
            request: request,
            count: 0,
        });
    } else {
        requestCount.count++;
    }

    try {
        await requestCount.save();

    } catch (err) {
        console.log(err);
    }

}

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

    // CREATE JWT TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    // UPDATE REQUEST COUNT
    getRequestCount("login");

    res.header('auth-token', token).send(token);
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
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);

    } catch (err) {
        res.status(400).send(err);
    }

    console.log(`User [${user.email}] added to the database.`);
};


module.exports.createUser = createUser;
module.exports.loginUser = loginUser;