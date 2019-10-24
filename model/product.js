var mongoose = require('mongoose');


//creación y conexion de la base de datos
//mongoose.connect('mongodb://catalog-db/catalog-database')
mongoose.connect('mongodb://localhost/catalogoDB')
.then(db => console.log('db connected'))
  .catch(err => console.log(err));
 

var Schema = mongoose.Schema;

var productSchema = new Schema({

    catalog:{
        vehiculos:{
            carros:{
                marca: String,
                year: Number,
                kilometraje: Number,
                combustible: String,
                color: String,
                transmision: String,
                placa: String,
                precio:{
                    valorPrecio:Number,
                    tipoPago: String
                }
            },
            motos:{
                marca: String,
                year: Number,
                kilometraje: Number,
                color: String,
                cilindrada: String,
                tipoVendedor: String,
                precio:{
                    valorPrecio: Number,
                    tipoPago: String
                }
            }
        },
        telefonosTablets:{
            telefonos:{
                marca: String,
                precio:{
                    valorPrecio: Number,
                    tipoPago: String
                }
            },
            tablets:{
                marca: String,
                precio:{
                    valorPrecio: Number,
                    tipoPago: String
                }
            }
        },
        computadores:{
            computadorEscritorio:{
                marca: String,
                precio:{
                    valorPrecio: Number,
                    tipoPago: String
                }
            },
            portatiles:{
                marca: String,
                precio:{
                    valorPrecio: Number,
                    tipoPago: String
                }
            }
        },
        electrodomesticos:{
            cocinas:{
                tipo: String,
                precio:{
                    valorPrecio: Number,
                    tipoPago: String
                }
            },
            neveras:{
                marca: String,
                precio:{
                    valorPrecio: Number,
                    tipoPago: String
                }
            }
        },
        empleos:{
            buscarTrabajo:{
                tipo: String,
                enEsteAnuncio: String,
                nombreCompania: String,
                experienciaMin: Number,
                experienciaMax: Number,
                salarioMin: Number,
                salarioMax: Number,
            }
        },
        servicios:{
            clasesCursos:{
                tipo:String
            },
            reparaciones:{
                tipo:String
            },
            transporteMudanza:{
                tipo:String
            }
        }
    }
})

var modelProduct = mongoose.model('product', productSchema)



 
module.exports = modelProduct;