
// CONTROLADOR
var express = require('express');
var app = express();
var Product = require("./model/product");
 
app.use(express.json()) // for parsing application/json


app.get('/product', function(req, res){
 
    Product.find({}).exec(function(err, data){
        if(err) {
            res.send('Error al obtener la lista de productos');
        } else {
            console.log(data);
            res.json(data);
        }
    });
});


app.post('/product', function (req, res) {
    
    var product = new Product(req.body)
    product.save(function(err, data) {
        if (err){
            res.send('Error al crear un nuevo producto');
            return console.error(err);
        }else{
            console.log(data);
            res.json(data);
        }
    });
     
})


app.put('/:id', function(req, res){
    let productId =req.params.id;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update,(err, productUpdate)=>{
        if(err) res.send('Error al actualizar el producto');
        res.status(200).send({product: productUpdate});
    })

});


app.delete('/:id', function(req, res){
    Product.findByIdAndRemove({
        _id: req.params.id
    },function(err, data){
        if(err) {
            res.send('Error al eliminar un producto');
        } else {
            console.log(data);
            res.send(data);
        }
    });
});


app.listen(4000, function () {
  console.log('Servidor conectado en el puerto 3000!');
});