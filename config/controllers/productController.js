const mongoose = require("mongoose");

const Product = require('../models/productModel');

exports.createProduct = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    //console.log(product);
    product.save()
    .then(result =>{
        console.log(result);
        res.status(202).json({
            message: "product created",
            createProduct: {
                _id: result._id,
                name: result.name,
                price: result.price
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

//get all product by user under get permission
exports.product_get = (req, res, next) => {
    Product.find()
        .select("name price _id")
        .exec()
        .then(docs =>{
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                            request: {
                                type: 'GET',
                                url: req.get('host')+'/products/'+ doc._id 
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
}    

exports.productUpdate = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: "product updated", 
                request : {
                    type: 'GET',
                    url: req.get('host')+'/products/' + id
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
