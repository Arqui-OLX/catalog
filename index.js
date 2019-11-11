// CONTROLADOR
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const parser = require("body-parser");
const cors = require('cors');
const Product = require("./model/product");
const port = 3002;



//creación y conexion de la base de datos
//mongoose.connect('mongodb://catalog-db/catalog-database')
const mongoDB = 'mongodb://localhost:27017/catalogDB';

mongoose.connect(mongoDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(db => console.log('db connected'))
.catch(err => console.log(err));



app.use(parser.urlencoded({extended: false}));
app.use(parser.json());
app.use(cors());



app.get('/product/:id',function(req, res){
    
    const id = req.params.id;


    Product.findById(id).exec(function(err, data){
        if(err) {
            res.status(500).send('Error al encontrar post');
        } else {
            console.log(data.created_at.toLocaleString());
            res.json(data);
        }
    });
});


app.get('/product', function(req, res){

    // GET localhost:3000/product?search=coffee shopping&priceFilter[]=200&priceFilter[]=10000000&subcategory=M
    //     &featureName=x&featureValue=y
    

    let query = Product.find({});
    let features = [];
    let pageNumber = parseInt(req.query.pageNumber);
    let nPerPage = parseInt(req.query.nPerPage);

    if (req.query.search  !== undefined) {
        query = query.find({ $text: { $search: '\"'+req.query.search+'\"' } });
    }

    if (req.query.priceFilter !== undefined) {
        query = query.find({ price: { $gt: parseInt(req.query.priceFilter[0]), $lte: parseInt(req.query.priceFilter[1]) } });
    }

    if (req.query.subcategory !== undefined) {
        query = query.find({ subcategory: req.query.subcategory })
    }


    if (req.query.featureName !== undefined  && req.query.featureValue !== undefined) {

        for (var i = 0; i <= req.query.featureName.length; i++) {
            features.push({featureName: req.query.featureName[i], featureValue: req.query.featureValue[i]})
        }

        query = query.find({features: {$elemMatch: {$or: features}}});

    }

    function printStudents(pageNumber, nPerPage) {
        print( "Page: " + pageNumber );
        db.students.find()
            .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
            .limit( nPerPage )
            .forEach( student => {
                print( student.name );
            } );
    }

    query
    .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
    .limit( nPerPage )
    .exec(function(err, data){
        if(err) {
            res.status(500).send('Error al realizar la busqueda');
        } else {
            console.log(data);
            res.json(data);
        }
    });
});


app.post('/product',function (req, res) {
    
    var product = new Product(req.body)
    product.save(function(err, data) {
        if (err){
            res.status(500).send('Error al crear un nuevo post');
            return console.error(err);
        }else{
            console.log(data);
            res.json(data);
        }
    });

})


app.put('/product/:id', function(req, res){
    let productId =req.params.id;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update,(err, productUpdate)=>{
        if(err) res.status(500).send('Error al actualizar el post');
        res.status(200).send({product: productUpdate});
    })

});


app.delete('/product/:id', function(req, res){
    Product.findByIdAndRemove({
        _id: req.params.id
    },function(err, data){
        if(err) {
            res.status(500).send('Error al eliminar un post');
        } else {
            console.log(data);
            res.send(data);
        }
    });
});




app.listen(port, function () {
    console.log(`Servidor conectado en el puerto ${port}!`);
});
