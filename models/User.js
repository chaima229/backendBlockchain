const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
});

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    console.log("Utilisateur avant génération du token:", user); // 🔍 Vérifie l'ID
    const token = jwt.sign({ _id: user._id.toString() }, "secretkey", { expiresIn: "1h" });
    console.log("Token généré pour l'utilisateur:", token);
    user.token = token;
    await user.save();
    return token;
};


// Find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid login credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }
    return user;
};



const User = mongoose.model('User', userSchema);

module.exports = User;
