const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_RoleSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'usermodel', required: true },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'rolemodel', required: true },

});

const User_Roles = mongoose.model('user_role', user_RoleSchema);

module.exports = User_Roles;