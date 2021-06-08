const mongoose = require("mongoose")

const userRole = require("../models/userRolemodel");
const User = require("../models/usermodel");
const Role = require("../models/rolemodel");


exports.userRoleCreate = (req, res, next) => {
    User.findById(req.body.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "user not found"
        });
      }
      Role.findById(req.body.roleId)
        .then(role => {
          if (!role) {
            return res.status(404).json({
              message: "role not found"
            });
          }
    const userrole = new userRole({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.userId,
        role: req.body.roleId,

    });
    userrole.save()
  })
})
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'userrole created',
                result: result,
                createdRole: {
                    _id: result._id,
                    user: req.body.userId,
                    role: req.body.roleId,
                    request: {
                        type: 'GET',
                        url: req.get('host') + '/assignUserRole/' + result._id
                    }
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
