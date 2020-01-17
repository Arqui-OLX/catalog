// CONTROLADOR
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const parser = require("body-parser");
const cors = require('cors');
const Product = require("./model/product");
const port = 3000;



//creación y conexion de la base de datos
//mongoose.connect('mongodb://catalog-db/catalog-database')
const mongoDB = 'mongodb://post-db/post';

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
            res.json(data);
        }
    });

});


app.get('/allProduct', async function(req, res){

    
    let posts = [];
    

    for (let i = 0; i < req.query.posts.length; i++) {
        
        const post = await Product.findById(req.query.posts[i]);
        posts.push(await post);


    }

    res.status(200).json(posts);

});

app.get('/product', function(req, res){

    // GET localhost:3000/product?search=coffee shopping&priceFilter[]=200&priceFilter[]=10000000&subcategory=M
    //     &featureName=x&featureValue=y

    let query = Product.find({});
    let features = [];
    let subcategory = [];
    let pageNumber = parseInt(req.query.pageNumber);
    let nPerPage = parseInt(req.query.nPerPage);

    if (req.query.profile  !== undefined) {
        query = query.find({ fk_profile: req.query.profile });
    }

    if (req.query.search  !== undefined) {
        query = query.find({ $text: { $search: '\"'+req.query.search+'\"' } });
    }

    if (req.query.priceFilter !== undefined) {
        query = query.find({ price: { $gt: parseInt(req.query.priceFilter[0]), $lte: parseInt(req.query.priceFilter[1]) } });
    }

    if (req.query.subcategory !== undefined) {

        for (var i = 0; i < req.query.subcategory.length; i++) {
            subcategory.push(req.query.subcategory[i]);
        }
        query = query.find({subcategory: { $in: subcategory } });

    }


    if (req.query.featureName !== undefined  && req.query.featureValue !== undefined) {

        for (var i = 0; i < req.query.featureName.length; i++) {
            features.push({featureName: req.query.featureName[i], featureValue: req.query.featureValue[i]})
        }

        query = query.find({features: {$elemMatch: {$or: features}}});

    }

    if (req.query.pageNumber !== undefined  && req.query.nPerPage !== undefined) {
        query = query
        .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
        .limit( nPerPage );
    }


    query.sort( {created_at: -1} ).exec(function(err, data){
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
