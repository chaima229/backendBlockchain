const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Route pour l'inscription
router.post('/register', userController.registerUser);

// Route pour la connexion
router.post('/login', userController.loginUser);

// Route pour la déconnexion
router.post('/logout', auth, userController.logoutUser);

// Route pour récupérer les informations de l'utilisateur authentifié
router.get('/users', auth, userController.getUser);

module.exports = router;
