const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    post:{

        category: String,
        subcategory:String, 
        date:Date,
        title: String,
        description: String,
        price: Number,
        priceType: String,
        features: Array
 
     }
})

const modelProduct = mongoose.model('product', productSchema)



 
module.exports = modelProduct;