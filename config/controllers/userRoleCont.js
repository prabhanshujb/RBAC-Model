const mongoose = require("mongoose")

const userRole = require("../models/userRoleModel");
const User = require("../models/usermodel");
const Role = require("../models/rolemodel");


exports.assignRoles = async (req, res, next) => {
    const query = {};
    query._id = req.body.roleId;
    console.log(query._id);
    const role = await Role.findById(query);
    console.log(role);
    if (!role) {
        res.status(404).json({
            message: "role not found"
        });
    }
    const queryo = {};
    queryo._id = req.body.userId;
    const user = await User.findById(queryo);
    console.log(user);
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
    }
    const userrole = new userRole({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        roleId: req.body.roleId,

    })
    userrole.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
        message: 'userrole created',
        result: result,
        createdRole: {
            _id: result._id,
            User: result.User,
            Role: result.Role
        },
        request: {
            type: 'GET',
            url: req.get('host') + '/assignUserRole/' + result._id
        }
    });
})
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.getUserRole = async (id) => {
    const query = {};
    query.userId = id;
    console.log("ssdf", query);
    const user_Role = await userRole.findOne(query).exec();
    console.log("adsd", user_Role);
    if(!user_Role){
        res.status(404).json({
            message: "userrole not found"
        });
    }
    return user_Role;
}
