const path = require("path");
const fs = require("fs");
const { create } = require("domain");
const db = require ('../data/models');
const Product = db.Product;
const ProductCategory = db.ProductCategory;
const Cart = db.Cart;
const ProductCart = db.ProductCart;


module.exports = {

productCart: (req, res) => {
    res.render("./products/productCart");
},

// OBTENIDO DE BASE DE DATOS
products: (req, res) => {

    db.Product.findAll({
        include: [{association: 'productCategory'}]
    })
    .then(productos => {
        res.render("./products/productDetail", {planes:productos});
    })
  //  const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));
  //  const listadoPlanes = JSON.parse(listadoPlanesJson);

  // let listadoPlanesActivos = listadoPlanes.filter(plan => plan.state == 1);

},

 //OBTENIDO DE LA BASE DE DATOS
productDetail: (req, res) => {
    
// const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));
// const listadoPlanes = JSON.parse(listadoPlanesJson);

    let id = req.params.id;

//    let planEncontrado = listadoPlanes.filter(plan => plan.id == id);

    db.Product.findByPk(id)
    .then(producto => {
        // LO MANDO COMO ARRAY PORQUE REUTILIZO LA VISTA DE DETALLE Y ESPERA REALIZAR UN FOREACH SOBRE UN ARRAY.
        let listaProducto = [];
        listaProducto.push(producto);
        res.render("./products/productDetail", {planes:listaProducto});
        
    })
  // res.json(planEncontrado);
   //res.render("./products/productDetail", {planes:planEncontrado});
},

productFormLoad: (req, res) => {
    res.render("./products/productLoad");
},

// PENDIENTE DE MODIFICAR
productFormEdit: (req, res) => {
    let id = req.params.id;

//    const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));
//    const listadoPlanes = JSON.parse(listadoPlanesJson);

//    let planEncontrado = listadoPlanes.filter(plan => plan.id == id);

    // console.log(planEncontrado);
//    res.render("./products/productEdit",{plan:planEncontrado});

    db.Product.findByPk(id)
    .then(producto => {
        // LO MANDO COMO ARRAY PORQUE REUTILIZO LA VISTA DE DETALLE Y ESPERA REALIZAR UN FOREACH SOBRE UN ARRAY.
        let listaProducto = [];
        listaProducto.push(producto);
  //      res.render("./products/productDetail", {planes:listaProducto});
            res.render("./products/productEdit",{plan:listaProducto});
        
        })
},

// CREADO EN LA BASE DE DATOS
productCreate: (req, res) => {
        //req.body.image = req.file.filename;
        //return res.send(req.body);
        const _body = { 
            name : req.body.name,
            description: req.body.description,
            duration: req.body.duration,
            image: "",
            id_category : req.body.category,
            price : req.body.price
        }    
        //return res.send(_body);
        Product.create(_body)
        .then(plan =>{
            res.redirect('/products');
        })
 //   const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));

//    const listadoPlanes = JSON.parse(listadoPlanesJson);

//planToCreate = {
//        id: listadoPlanes[listadoPlanes.length-1].id + 1,
//        ...req.body,
//        state: 1
//    }

  //  listadoPlanes.push(planToCreate)

   // console.log(listadoPlanes);
//    const newListadoPlanes = JSON.stringify(listadoPlanes);

  //   fs.writeFileSync(path.join(__dirname, '../data/products.json'),newListadoPlanes,'');
    
  
   // res.redirect("/");
},

// PENDIENTE DE MODIFICAR
productEdit: (req, res) => {

    let id = req.params.id;

 //   const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));

 //   const listadoPlanes = JSON.parse(listadoPlanesJson);

 //   planToEdit = {
 //       id: id,
 //       ...req.body,
 //       state: 1
 //   }

    Product.update ({
        name : req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        image: "",
        id_category : req.body.category,
        price : req.body.price
    }, {
        where: {
            id:req.params.id
       }
    })
    .then(()=> res.redirect('/products/'+req.params.id+'/'))
 
//    console.log(planToEdit);
    
//   const listadoPlanesActualizado = listadoPlanes.map(plan => plan.id == planToEdit.id ? planToEdit: plan );


//    const newListadoPlanesActualizado = JSON.stringify(listadoPlanesActualizado);

    
//     fs.writeFileSync(path.join(__dirname, '../data/products.json'),newListadoPlanesActualizado,'');
    
//    res.redirect("/");
},

// PENDIENTE DE MODIFICAR
productDelete: (req, res) => {
    //let id = req.params.id;

    //const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));

    //const listadoPlanes = JSON.parse(listadoPlanesJson);

    //const planAActualizar = listadoPlanes.filter(plan => plan.id == id);

    //planAActualizar[0].state = 0;

    //const listadoPlanesActualizado = listadoPlanes.map(plan => plan.id == planAActualizar.id ? planAActualizar: plan );

    //const newListadoPlanesActualizado = JSON.stringify(listadoPlanesActualizado);
    
    //fs.writeFileSync(path.join(__dirname, '../data/products.json'),newListadoPlanesActualizado,'');

    //res.redirect("/");
    Product.destroy({
        where: {
            id : req.params.id
        }
    })
    .then(()=>  res.redirect('/products'))
},
// CREADO PARA PROBAR EL SEQUELIZE
productAll:  (req, res) => {
    db.Product.findAll({
        include: [{association: 'productCategory'}]
    })
    .then(productos => {
        res.json(productos);
    })
},
// CREADO PARA PROBAR EL SEQUELIZE
cartAll: (req, res) => {
    db.Cart.findAll({
        include: [{association: 'user'}, {association: 'productCarts'}]
    })
    .then(carts => {
        res.json(carts);
    })
}

}