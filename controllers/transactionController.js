const Transaction = require('../models/Transaction');

// Créer une nouvelle transaction
exports.createTransaction = async (req, res) => {
    try {
        console.log("Req.user avant la vérification:", req.user); // 🔍 Vérifie ce qu'il contient

        if (!req.user) {
            console.log("⚠ req.user est undefined !");
            return res.status(401).json({ error: "User not authenticated" });
        }

        const { receiver, amount,  cryptoId } = req.body;
        const sender = req.user._id; // Récupère l'ID de l'utilisateur authentifié
        console.log("Transaction envoyée par:", sender);

        const newTransaction = new Transaction({ sender, receiver, amount });
        await newTransaction.save();

        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Obtenir toutes les transactions
exports.getAllTransactions = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtenir une transaction par ID
exports.getTransactionById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une transaction par ID
exports.deleteTransaction = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modifier une transaction par ID
exports.updateTransaction = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { sender, receiver, amount } = req.body;
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { sender, receiver, amount },
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
