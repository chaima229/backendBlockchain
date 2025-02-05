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

// Déconnexion d'un utilisateur
exports.logoutUser = async (req, res) => {
    try {
        req.user.token = null; // Supprimer le token de l'utilisateur
        await req.user.save();
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer les informations de l'utilisateur authentifié
exports.getUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
