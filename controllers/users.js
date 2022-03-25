import { v4 as uuid } from 'uuid';

let users = [];

export const getUsers = (req, res) => {
    console.log(`Users in the database: ${users}`);

    res.send(users);
}

export const createUser = (req, res) => {
    const user = req.body;
    console.log(user);

    users.push({ ...user, id: uuid() });

    console.log(`User [${user.username}] added to the database.`);
    res.send("User Added!");
};

export const getUser = (req, res) => {
    res.send(req.params.id)
};

export const deleteUser = (req, res) => {

    users = users.filter((user) => user.id !== req.params.id);
    res.send(`user with id ${req.params.id} has been deleted`);
};

export const updateUser = (req, res) => {
    const user = users.find((user) => user.id === req.params.id);

    user.username = req.body.username;
    user.age = req.body.age;

    console.log(`username has been updated to ${req.body.username}. Age has been updated to ${req.body.age}`)
};