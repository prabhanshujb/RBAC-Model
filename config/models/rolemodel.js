const mongoose = require('mongoose');

const RolesSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    }
});

module.exports = mongoose.model('rolemodel', RolesSchema);
