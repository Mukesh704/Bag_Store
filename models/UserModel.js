const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,
        required: true
    },
    picture: {
        type: String
    }
})

const User = mongoose.model('user', userSchema);
module.exports = User;