// CONTROLADOR
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const parser = require("body-parser");
const productRoutes = require('./routes/products');


//creación y conexion de la base de datos
//mongoose.connect('mongodb://catalog-db/catalog-database')
const mongoDB = 'mongodb://localhost/catalogDB';

mongoose.connect(mongoDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
 })
.then(db => console.log('db connected'))
  .catch(err => console.log(err));
 
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

app.use(productRoutes);

app.use((req, res, next) => {

    const error = new Error('Invalid route');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(3002, function () {
  console.log('Servidor conectado en el puerto 3002!');
});