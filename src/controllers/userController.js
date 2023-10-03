const userModel = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    const users = userModel.getUsers();
    res.json(users);
};