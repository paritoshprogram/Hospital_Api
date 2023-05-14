const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    user_type:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:false
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;