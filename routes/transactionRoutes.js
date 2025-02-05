const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/authMiddleware');


router.post('/test-token/:token', auth, (req, res) => {
    res.json({ user: req.user, "bonjour": "chaimaa" });
});
// Route pour créer une nouvelle transaction
router.post('/transactions', auth, transactionController.createTransaction);

// Route pour obtenir toutes les transactions
router.get('/transactions', auth, transactionController.getAllTransactions);

// Route pour obtenir une transaction par ID
router.get('/transactions/:id', auth, transactionController.getTransactionById);

// Route pour supprimer une transaction par ID
router.delete('/transactions/:id', auth, transactionController.deleteTransaction);

// Route pour modifier une transaction par ID
router.put('/transactions/:id', auth, transactionController.updateTransaction);

module.exports = router;
