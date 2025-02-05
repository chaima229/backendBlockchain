const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        console.log("Header Authorization reçu:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("⚠ Aucun token fourni !");
            return res.status(401).json({ error: "No token provided" });
        }

        const token = authHeader.replace("Bearer ", "").trim();
        console.log("Extracted Token:", token);

        const decoded = jwt.verify(token, 'secretkey'); // Assure-toi que 'secretkey' est le bon
        console.log("Decoded Token:", decoded);

        // Vérifie si l'utilisateur existe
        const user = await User.findById(decoded._id);
        console.log("Utilisateur trouvé en base:", user);

        if (!user) {
            console.log("⚠ Utilisateur non trouvé !");
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user; // 🟢 Ici, on ajoute bien req.user
        next();
    } catch (error) {
        console.error("Erreur JWT:", error.message);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = auth;
