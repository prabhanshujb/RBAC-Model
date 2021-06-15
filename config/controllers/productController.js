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
