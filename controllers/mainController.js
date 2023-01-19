const path = require("path");
const fs = require("fs");
const { create } = require("domain");


module.exports = {
index: (req, res) => {
    res.render("index");
},

login: (req, res) => {
    res.render("./users/login");
},

register: (req, res) => {
    res.render("./users/register");
},

productCart: (req, res) => {
    res.render("./products/productCart");
},

products: (req, res) => {
    const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    const listadoPlanes = JSON.parse(listadoPlanesJson);

    res.render("./products/productDetail", {planes:listadoPlanes});
},

productDetail: (req, res) => {
    
    const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    const listadoPlanes = JSON.parse(listadoPlanesJson);

    let id = req.params.id;

    let planEncontrado = listadoPlanes.filter(plan => plan.id == id);

    res.render("./products/productDetail", {planes:planEncontrado});
},

productLoad: (req, res) => {
    res.render("./products/productLoad");
},

productEdit: (req, res) => {
    let id = req.params.id;

    let planEncontrado = listadoPlanes.filter(plan => plan.id == id);

    res.render("./products/productEdit",{planes:planEncontrado});
},

productCreate: (req, res) => {

    const listadoPlanesJson = fs.readFileSync(path.join(__dirname, '../data/products.json'));

    const listadoPlanes = JSON.parse(listadoPlanesJson);

    planToCreate = {
        id: listadoPlanes[listadoPlanes.length-1].id + 1,
        ...req.body
    }

    listadoPlanes.push(planToCreate)

    console.log(listadoPlanes);
    const newListadoPlanes = JSON.stringify(listadoPlanes);

     fs.writeFileSync(path.join(__dirname, '../data/products.json'),newListadoPlanes,'');
    
  
    res.redirect("/");
}

}