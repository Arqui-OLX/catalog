
var mongoose = require('mongoose');


//creación y conexion de la base de datos
mongoose.connect('mongodb://localhost/catalogoDB')
.then(db => console.log('db connected'))
  .catch(err => console.log(err));
 

var Schema = mongoose.Schema;

var productSchema = new Schema({

    name: String,
    price: Number

})

var modelProduct = mongoose.model('product', productSchema)

 
module.exports = modelProduct;
