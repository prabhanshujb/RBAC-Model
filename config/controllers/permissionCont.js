const mongoose = require("mongoose")

const Permission = require("../models/permissionsmodel");

exports.permissionGet = (req, res, next) => {
    Permission.find()
        .select("name _id")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        name: doc.name,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: req.get('host') + '/permission/' + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};    //for regestering diff routes


exports.permissionCreate = (req, res, next) => {
    const permission = new Permission({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    permission.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'permission created',
                result: result,
                createdRole: {
                    name: result.name,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: req.get('host') + '/permission/' + result._id
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

exports.permissionGetId = (req, res, next) => {
    const id = req.params.permissionId;
    Permission.findById(id)
        .select("name _id")
        .exec()
        .then(doc => {
            console.log("From database", doc); //fetching the data from database
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: req.get('host') + '/permission/'
                    }
                });
            }
            else {
                res.status(404).json({ message: "no valid entry found" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error });
        });
};

exports.permissionUpdate = (req, res, next) => {
    const id = req.params.permissionId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Permission.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "permission updated",
                request: {
                    type: 'GET',
                    url: req.get('host') + '/role/' + id
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

exports.permissionDelete = (req, res, next) => {
    const id = req.params.permissionId;
    Permission.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'permission deleted',
                request: {
                    type: 'POST',
                    url: req.get('host') + '/permission/',
                    body: { name: 'String' }
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