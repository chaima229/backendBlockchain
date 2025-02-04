const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Registering user:', email); // Log email
        const user = new User({ email, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error); // Log error
        res.status(400).send({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }
        res.send({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error); // Log error
        res.status(400).send({ error: 'Error logging in' });
    }
};
