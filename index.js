const express = require('express');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

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
// "/faces"
// "/data"
// "/id"
app.get("/", (req, res) => res.send("Welcome to the FakeMe API!"));
app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));