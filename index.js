import express from "express";
const dotenv = require('dotenv');
const mongoose = require('mongoose');

import usersRoutes from "./routes/users.js";
const faceRoutes = require('./routes/face');
const identityRoutes = require('./routes/identity');
dotenv.config();

const app = express();
const PORT = 5000;

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => 
    console.log('Connected to db')
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));
app.use('/face', faceRoutes);
app.use('/identity', identityRoutes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));