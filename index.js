
// CONTROLADOR
var express = require('express');
var app = express();
var Product = require("./model/product");
 
app.use(express.json()) // for parsing application/json



app.get('/product', function(req, res){
    console.log('getting all books');
    Product.find({}).exec(function(err, data){
        if(err) {
            res.send('error has occured');
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
            return console.error(err);
        }else{
            console.log(data);
            res.json(data);
        }
    });
     
})


app.put('/:id', function(req, res){
    Product.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            name: req.body.name,
            price: req.body.price,
         }
    },{
        upsert: true
    },function(err, data){
        if(err) {
            res.send('error updating book');
        } else {
            console.log(data);
            res.send(data);
        }
    });
});



app.delete('/:id', function(req, res){
    Product.findByIdAndRemove({
        _id: req.params.id
    },function(err, data){
        if(err) {
            res.send('error deleting book');
        } else {
            console.log(data);
            res.send(data);
        }
    });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});