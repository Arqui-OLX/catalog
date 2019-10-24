const express = require('express');
const router = express.Router();

const Product = require("../model/product");

router.get('/product', function(req, res){
 
    Product.find({}).exec(function(err, data){
        if(err) {
            res.status(500).send('Error al obtener la lista de productos');
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

router.get('/product/:id', function(req, res){
    
    const id = req.params.id;

    Product.findById(id).exec(function(err, data){
        if(err) {
            res.status(500).send('Error al encontrar producto');
        } else {
            console.log(data);
            res.json(data);
        }
    });
});


router.post('/product', function (req, res) {
    
    var product = new Product(req.body)
    product.save(function(err, data) {
        if (err){
            res.status(500).send('Error al crear un nuevo producto');
            return console.error(err);
        }else{
            console.log(data);
            res.json(data);
        }
    });
     
})


router.put('/product/:id', function(req, res){
    let productId =req.params.id;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update,(err, productUpdate)=>{
        if(err) res.status(500).send('Error al actualizar el producto');
        res.status(200).send({product: productUpdate});
    })

});


router.delete('/product/:id', function(req, res){
    Product.findByIdAndRemove({
        _id: req.params.id
    },function(err, data){
        if(err) {
            res.status(500).send('Error al eliminar un producto');
        } else {
            console.log(data);
            res.send(data);
        }
    });
});

module.exports = router;