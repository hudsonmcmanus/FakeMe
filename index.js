var cors = require('cors');

const express = require('express');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const faceRoutes = require('./routes/face');
const idRoutes = require('./routes/id');
const reqRoutes = require('./routes/reqs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const verify = require('./routes/verifyToken')
const app = express();
const PORT = 5000;

app.use(cors());

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('connected to db!')
);

app.use(function (req, res, next) {
    // TODO: Replace link
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use('/face', faceRoutes);
app.use('/id', idRoutes);
app.use('/reqs', reqRoutes);
// "/data"
app.get("/", (req, res) => res.send("Welcome to the FakeMe API!"));
app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));