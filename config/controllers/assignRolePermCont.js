const mongoose = require("mongoose")

const rolePerm = require("../models/rolePermissionsModel");
const Permission = require("../models/permissionsmodel");
const Role = require("../models/rolemodel");
const User = require("../models/userRoleModel")

exports.rolepermission = async (req, res, next) => {
  const permissionquery = {};
  permissionquery._id = req.body.permissionsId;
  const permission = await Permission.findById(permissionquery);
  console.log(permission);
  if (!permission) {
    res.status(404).json({
      message: "permission not found"
    });
  }
  const rolequery = {};
  rolequery._id = req.body.roleId;
  console.log(rolequery._id);
  const role = await Role.findById(rolequery);
  console.log(role);
  if (!role) {
    res.status(404).json({
      message: "Role not found"
    });
  }
  const permissionrole = new rolePerm({
    _id: new mongoose.Types.ObjectId(),
    permissionsId: req.body.permissionsId,
    roleId: req.body.roleId,
  })
  return permissionrole.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "rolePermission stored",
        result: result,
        createdRolePermission: {
          _id: result._id,

          Permission: result.name,
          Role: result.name
        },
        request:
        {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.getRolePermission = async (id) => {
  const query = {};
  query.roleId = id;
  //console.log("RP", query);
  const Role_permission = await rolePerm.findOne(query).exec();
  //console.log("RPM", Role_permission.roleId);
  if(!Role_permission.roleId){
      res.status(404).json({
          message: "rolepermission not found"
      }); 
  }
  const thisrole = Role_permission.roleId;
  //console.log("this is",thisrole);
  return thisrole;
};
