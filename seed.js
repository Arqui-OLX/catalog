var faker = require('faker');
var Product = require('./model/product');


Product.remove({}, function(){
    console.log("Vaciando esquema"); 
}); 
 

for(var i =0; i<= 40; i++){

    brands =["Renault", "Toyota", "Chevrolet","Mazda", "Kyia", "Mercedes", "Nissan"];
    brandsMotos =["AKT", "BMW", "Zuzuki","Ducati", "Auteco", "Honda"];
    combustible =["Diesel", "Gasolina", "Gasolina y gas"];
    color =["blanco", "amarillo", "azul", "Rojo", "negro", "gris", "verde"];
    transmision =["Mecanica", "Automatica"];
    tipoPago =["negociable", "precio fijo", "a consultar"];
    tipoVendedor =["Vendedor profesional", "persona natural"]
    cilindrada =[50, 250,500,125];
    marcaTelefonos =["Azumi", "apple","alcatel", "xiaomi", "Nokia", "motorola"];
    marcaTablets = ["Samsung", "Ipad", "Otros"];
    marcaPortatil = ["Samsung", "Apple", "Toshiba", "Lenovo", "HP"];
    tipoCocina = ["cafeteras", "cocinas", "heladera", "licuadoras", "microondas", "otros"];
    enEsteAnuncio =["Estoy buscando empleo", "Estoy ofreciendo empleo"];
    clasesCursos= ["Danzas", "idiomas", "informatica", "musica", "otros", "teatro", "tutores"];
    reparaciones =["carpinteria", "cerrajeria", "construccion", "electricista", "herreria", "mecanicos", "otros"]
    transporteMudanza =["transporte", "mudanza"];

    var product = new Product();

    product.catalog.vehiculos.carros.anio = faker.date.past(10).getFullYear();
    product.catalog.vehiculos.carros.marca = brands[faker.random.number(brands.length-1)];
    product.catalog.vehiculos.carros.kilometraje = faker.random.number(10000);
    product.catalog.vehiculos.carros.combustible = combustible[faker.random.number(combustible.length-1)]; 
    product.catalog.vehiculos.carros.color = color[faker.random.number(color.length-1)]; ;
    product.catalog.vehiculos.carros.transmision = transmision[faker.random.number(transmision.length-1)]; 
    product.catalog.vehiculos.carros.placa =  faker.random.number(999);
    product.catalog.vehiculos.carros.precio.valorPrecio = faker.commerce.price();
    product.catalog.vehiculos.carros.precio.tipoPago = tipoPago[faker.random.number(tipoPago.length-1)]; ;

    product.catalog.vehiculos.motos.marca = brandsMotos[faker.random.number(brandsMotos.length-1)]; 
    product.catalog.vehiculos.motos.anio =  faker.random.number({min:1990, max:2020});
    product.catalog.vehiculos.motos.kilometraje = faker.random.number(10000);
    product.catalog.vehiculos.motos.color = color[faker.random.number(color.length-1)]; 
    product.catalog.vehiculos.motos.cilindrada = cilindrada[faker.random.number(cilindrada.length-1)]; 
    product.catalog.vehiculos.motos.tipoVendedor = tipoVendedor[faker.random.number(tipoVendedor.length-1)]; 
    product.catalog.vehiculos.motos.precio.valorPrecio =  faker.commerce.price();
    product.catalog.vehiculos.motos.precio.tipoPago = tipoPago[faker.random.number(tipoPago.length-1)]; 

    product.catalog.telefonosTablets.telefonos.marca = marcaTelefonos[faker.random.number(marcaTelefonos.length-1)]; 
    product.catalog.telefonosTablets.telefonos.precio.valorPrecio = faker.commerce.price();
    product.catalog.telefonosTablets.telefonos.precio.tipoPago = tipoPago[faker.random.number(tipoPago.length-1)]; 

    product.catalog.telefonosTablets.tablets.marca = marcaTablets[faker.random.number(marcaTablets.length-1)]; 
    product.catalog.telefonosTablets.tablets.precio.valorPrecio = faker.commerce.price();
    product.catalog.telefonosTablets.tablets.precio.tipoPago = tipoPago[faker.random.number(tipoPago.length-1)]; 

    product.catalog.computadores.computadorEscritorio.precio.valorPrecio = faker.commerce.price();
    product.catalog.computadores.computadorEscritorio.precio.tipoPago = tipoPago[faker.random.number(tipoPago.length-1)]; 

    product.catalog.computadores.portatiles.marca = marcaPortatil[faker.random.number(marcaPortatil.length-1)]; 
    product.catalog.computadores.portatiles.precio.valorPrecio = faker.commerce.price();
    product.catalog.computadores.portatiles.precio.tipoPago = tipoPago[faker.random.number(tipoPago.length-1)]; 

    product.catalog.electrodomesticos.cocinas.tipo = tipoCocina[faker.random.number(marcaPortatil.length-1)];
    product.catalog.electrodomesticos.cocinas.precio.valorPrecio = faker.commerce.price();
    product.catalog.electrodomesticos.cocinas.precio.tipoPago = tipoPago[faker.random.number(tipoPago.length-1)];

    product.catalog.electrodomesticos.neveras.precio.valorPrecio =faker.commerce.price();
    product.catalog.electrodomesticos.neveras.precio.tipoPago = tipoPago[faker.random.number(tipoPago.length-1)]; 

    product.catalog.empleos.buscarTrabajo.tipo = faker.name.jobType();
    product.catalog.empleos.buscarTrabajo.enEsteAnuncio = enEsteAnuncio[faker.random.number(enEsteAnuncio.length-1)];
    product.catalog.empleos.buscarTrabajo.nombreCompania = faker.random.word();
    product.catalog.empleos.buscarTrabajo.experienciaMin = faker.random.number({min:1, max:20});
    product.catalog.empleos.buscarTrabajo.experienciaMax = faker.random.number({min:1, max:20});
    product.catalog.empleos.buscarTrabajo.salarioMin = faker.commerce.price();
    product.catalog.empleos.buscarTrabajo.salarioMax = faker.commerce.price();
    product.catalog.servicios.clasesCursos.tipo = clasesCursos[faker.random.number(clasesCursos.length-1)];

    product.catalog.servicios.reparaciones.tipo = reparaciones[faker.random.number(reparaciones.length-1)];

    product.catalog.servicios.transporteMudanza.tipo = transporteMudanza[faker.random.number(transporteMudanza.length-1)];


    product.save(function(err, data) {
        if (err){
             return console.error(err);
        }else{
            console.log(data);
         }
    });
}



//console.log(faker.date.past(10).getFullYear());






 