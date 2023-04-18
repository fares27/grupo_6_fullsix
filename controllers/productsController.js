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

// ----------------   CONTROLLER PARA VISTA DE PRODUCTOS ------------------ //
products: (req, res) => {

    // OBTENGO TODOS LOS PRODUCTOS DE LA BASE DE DATOS
    db.Product.findAll({
        where:  {
                state : 1
                }      
    })
    .then(productos => {
        res.render("./products/productDetail", {planes:productos});
    })

},

// ----------------   CONTROLLER PARA VISTA DETALLE DE UN PRODUCTO ------------------ //
productDetail: (req, res) => {
    
    let id = req.params.id;

    db.Product.findByPk(id)
    .then(producto => {
        // LO MANDO COMO ARRAY PORQUE REUTILIZO LA VISTA DE DETALLE Y ESPERA REALIZAR UN FOREACH SOBRE UN ARRAY.
        let listaProducto = [];
        listaProducto.push(producto);
        res.render("./products/productDetail", {planes:listaProducto});
        
    })
},

// ----------------   CONTROLLER PARA VISTA CARGA DE UN PRODUCTO ------------------ //
productFormLoad: (req, res) => {

    // OBTENGO LISTADO DE CATEGORIAS DE LA BASE DE DATOS
    db.ProductCategory.findAll({
    })
    .then(listadoCategorias => {
        res.render("./products/productLoad",{categorias:listadoCategorias});
    })
   
},

// ----------------   CONTROLLER PARA VISTA EDICION DE UN PRODUCTO ------------------ //
productFormEdit: (req, res) => {
    // OBTENGO EL ID DE LOS PARÁMETROS
    let id = req.params.id;

    // REALIZADO LAS CONSULTAS A LA BASE DE DATOS
    const categorias = ProductCategory.findAll()
    const producto = Product.findByPk(id)

    // UNA VEZ REALIZADA LAS CONSULTAS, LAS ENVIO A LA VISTA
    Promise.all([producto,categorias])  
    .then( ([productoEditar, listaCategorias]) =>{
        let listaProducto = [];
        listaProducto.push(productoEditar);
        res.render("./products/productEdit",{plan:listaProducto, categorias:listaCategorias});
    })  
},

// ----------------   CONTROLLER PARA CREACION EN BD DE UN PRODUCTO ------------------ //
productCreate: (req, res) => {

        const defaultImagePath = 'public\\img\\producst\\default-image.jpg';
                     let image = defaultImagePath;
            if (req.file !== undefined) {
                    image = req.file.path;
            }
        const _body = { 
            name : req.body.name,
            description: req.body.description,
            duration: req.body.duration,
            image: image,
            id_category : req.body.category,
            price : req.body.price,
            state: 1
        }    
        console.log(_body)
        //return res.send(_body);
        Product.create(_body)
        .then(plan =>{
            res.redirect('/products');
        })
},

// ----------------   CONTROLLER PARA EDICION EN BD DE UN PRODUCTO ------------------ //
productEdit: (req, res) => {

    let id = req.params.id;

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

// ----------------   CONTROLLER PARA BAJA LOGICA EN BD DE UN PRODUCTO ------------------ //
productDelete: (req, res) => {
    Product.update ({
        state: 0
    }, {
        where: {
            id:req.params.id
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
        include: {all: true , nested: true}
    })
    .then(carts => {
        res.json(carts);
    })
}

}