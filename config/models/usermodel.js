const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        min: 6,
        max: 255,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    },
    password: {
        type: String,
        required: true,
        min: 6,
        //6 to 20 characters which contain at least one numeric digit,
        // one uppercase and one lowercase letter
        passw: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
        max: 1024
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;