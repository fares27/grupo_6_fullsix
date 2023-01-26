const path = require("path");
const fs = require("fs");
const { create } = require("domain");

module.exports = {

productCart: (req, res) => {
    res.render("./products/productCart");
},

products: (req, res) => {

    const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    const listadoPlanes = JSON.parse(listadoPlanesJson);

    let listadoPlanesActivos = listadoPlanes.filter(plan => plan.state == 1);

    res.render("./products/productDetail", {planes:listadoPlanesActivos});
},

productDetail: (req, res) => {
    
    const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    const listadoPlanes = JSON.parse(listadoPlanesJson);

    let id = req.params.id;

    let planEncontrado = listadoPlanes.filter(plan => plan.id == id);

    res.render("./products/productDetail", {planes:planEncontrado});
},

productFormLoad: (req, res) => {
    res.render("./products/productLoad");
},

productFormEdit: (req, res) => {
    let id = req.params.id;

    const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    const listadoPlanes = JSON.parse(listadoPlanesJson);

    let planEncontrado = listadoPlanes.filter(plan => plan.id == id);

    // console.log(planEncontrado);
    res.render("./products/productEdit",{plan:planEncontrado});
},

productCreate: (req, res) => {

    const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));

    const listadoPlanes = JSON.parse(listadoPlanesJson);

    planToCreate = {
        id: listadoPlanes[listadoPlanes.length-1].id + 1,
        ...req.body,
        state: 1
    }

    listadoPlanes.push(planToCreate)

   // console.log(listadoPlanes);
    const newListadoPlanes = JSON.stringify(listadoPlanes);

     fs.writeFileSync(path.join(__dirname, '../data/products.json'),newListadoPlanes,'');
    
  
    res.redirect("/");
},

productEdit: (req, res) => {

    let id = req.params.id;

    const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));

    const listadoPlanes = JSON.parse(listadoPlanesJson);

    planToEdit = {
        id: id,
        ...req.body,
        state: 1
    }
 
    console.log(planToEdit);
    
    const listadoPlanesActualizado = listadoPlanes.map(plan => plan.id == planToEdit.id ? planToEdit: plan );


    const newListadoPlanesActualizado = JSON.stringify(listadoPlanesActualizado);

    
     fs.writeFileSync(path.join(__dirname, '../data/products.json'),newListadoPlanesActualizado,'');
    
    res.redirect("/");
},

productDelete: (req, res) => {
    let id = req.params.id;

    const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));

    const listadoPlanes = JSON.parse(listadoPlanesJson);

    const planAActualizar = listadoPlanes.filter(plan => plan.id == id);

    planAActualizar[0].state = 0;

    const listadoPlanesActualizado = listadoPlanes.map(plan => plan.id == planAActualizar.id ? planAActualizar: plan );

    const newListadoPlanesActualizado = JSON.stringify(listadoPlanesActualizado);
    
    fs.writeFileSync(path.join(__dirname, '../data/products.json'),newListadoPlanesActualizado,'');

    res.redirect("/");
}

}