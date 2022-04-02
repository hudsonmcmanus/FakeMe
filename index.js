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

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use('/face', verify, faceRoutes);
app.use('/id', verify, idRoutes);
app.use('/reqs', reqRoutes);
// "/data"
app.get("/", (req, res) => res.send("Welcome to the FakeMe API!"));
app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));