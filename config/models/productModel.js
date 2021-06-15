const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product