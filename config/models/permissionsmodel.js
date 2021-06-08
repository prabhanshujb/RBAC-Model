const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionsSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
});

const Permissions = mongoose.model('permissionsmodel', PermissionsSchema);

module.exports = Permissions;