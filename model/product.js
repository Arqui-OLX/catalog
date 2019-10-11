
var mongoose = require('mongoose');


//creación y conexion de la base de datos
mongoose.connect('mongodb://localhost/catalogoDB')
.then(db => console.log('db connected'))
  .catch(err => console.log(err));
 

var Schema = mongoose.Schema;

var productSchema = new Schema({

    catalog:{
        vehiculos:{
            carros:{
                marca: String,
                anio: Number,
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
                anio: Number,
                kilometraje: Number,
                color: String,
                cilindrada: String,
                tipoVendedor: String,
                precio:{
                    valorPrecio:Number,
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
                precio:{
                    valorPrecio: Number,
                    tipoPago: String
                }
            },
            portatiles:{

                marca:String,
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
                experienciaMin:Number,
                experienciaMax:Number,
                salarioMin:Number,
                salarioMax:Number,
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
