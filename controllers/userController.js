const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Inscription d'un nouvel utilisateur
exports.registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        console.log("chaimaa token",token);
        res.status(200).json({ user, token }); // Renvoyer le token au frontend
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
