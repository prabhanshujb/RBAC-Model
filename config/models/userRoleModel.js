const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRoleSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'rolemodel', required: true },

});

module.exports = mongoose.model('userRole', userRoleSchema);