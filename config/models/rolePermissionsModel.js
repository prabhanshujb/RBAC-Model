const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolePermissionsSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    permissionsId: { type: mongoose.Schema.Types.ObjectId, ref: 'usermodel', required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'rolemodel', required: true },

});

const role_permissions = mongoose.model('rolePermissions', rolePermissionsSchema);

module.exports = role_permissions;