const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    _id: String,
    category: String,
    subcategory:String, 
    created_at : { 
        type : Date, 
        default: Date.now
    },
    title: { type: String},
    description: { type: String},
    price: Number,
    priceType: String,
    features: [{
        featureName: String,
        featureValue: String
    }]
});

productSchema.index({ title: 'text', description: 'text' });

const modelProduct = mongoose.model('product', productSchema);



 
module.exports = modelProduct;
