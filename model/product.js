
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
                anio: String,
                kilometraje: Number,
                combustible: String,
                color: String,
                Transmision: String,
                placa: String,
                precio:{
                    valorPrecio:String,
                    tipoPago: String
                }
            },
            motos:{
                marca: String,
                anio: Number,
                kilometraje: Number,
                color: String,
                cilindrada: String,
                tipoVendedor: String
            }
        },
        telefonosTablets:{
            telefonos:{
                marca: String,
                precio:{
                    valorPrecio: String,
                    tipoPago: String
                }
            },
            tablets:{
                marca: String,
                precio:{
                    valorPrecio: String,
                    tipoPago: String
                }

            }
        },
        computadores:{
            compatorEscritorio:{
                precio:{
                    valorPrecio: String,
                    tipoPago: String
                }
            },
            portatiles:{
                precio:{
                    valorPrecio: String,
                    tipoPago: String
                },
                marca:String
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
                tipo: String,
                precio:{
                    valorPrecio: String,
                    tipoPago: String
                }
            }
        },
        empleos:{
            BuscarTrabajo:{
                tipo: String,
                enEsteAnuncio: String,
                nombreCompania: String,
                experienciaMin:Number,
                experienciaMax:Number,
                salarioMin:String,
                salarioMax:String,
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
