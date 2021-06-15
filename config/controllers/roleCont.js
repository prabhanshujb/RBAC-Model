const mongoose = require("mongoose")

const Role = require("../models/rolemodel");

exports.role_get = (req, res, next) => {
Role.find()
    .select("name _id")
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            users: docs.map(doc => {
                return {
                    name: doc.name,
                    _id: doc._id,
                        request: {
                            type: 'GET',
                            url: req.get('host')+'/role/'+ doc._id 
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


exports.roleCreateNew = (req, res, next) => { 
    Role.find({name: req.body.name})
    .exec()
    .then(role =>{
      if(role.length >= 1){
      return res.status(409).json({
        message: "role already exist"
      });
    }
});
    const role = new Role({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    role.save()
        .then(result =>{
        console.log(result);
        res.status(201).json({
        message: 'role created',
        createdRole: {
            name: result.name,
            _id: result._id,
            request: {
                type: 'GET',
                url: req.get('host')+'/role/'+ result._id 
            }
        }
    });
})
.catch(err =>{
    console.log(err);
    res.status(500).json({
    error: err
    });
    });
};

exports.roleGetId = (req, res, next) => { 
    const id = req.params.roleId;
    Role.findById(id)
    .select("name _id")
    .exec()
    .then(doc =>{
        console.log("From database",doc); //fetching the data from database
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: req.get('host')+'/role/'
                }
            }); 
        }
        else{
            res.status(404).json({message: "no valid entry found"});
        }
    })
    .catch(err =>{
        console.log(err);   
        res.status(500).json({error});
    });
}; 

exports.roleUpdate = (req, res, next) => {
    const id = req.params.roleId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Role.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: "role updated", 
                request : {
                    type: 'GET',
                    url: req.get('host')+'/role/' + id
                }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.roleDelete = (req, res, next)=>{
    const id = req.params.roleId;
    Role.remove({ _id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Role deleted',
          request: {
              type: 'POST',
              url: req.get('host')+'/role/',
              body: { name: 'String' }
          }
        });
        })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};