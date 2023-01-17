const path = require("path");

let listadoPlanes = 
    [{"id":1,
    "name":"Plan Deportistas",
    "description":["Incluye una entrevista con un especialista","Plan detallado para todo el mes", "Videollamadas semanales","opiniones de expertos"],
    "price":6839.07,
    "image":"plan1.png",
    "duration":"60-90 minutos"},
    {"id":2,
    "name":"Plan Entrenadores",
    "description":["Incluye una entrevista con un especialista","Plan detallado para todo el mes", "Videollamadas semanales","opiniones de expertos"],
    "price":5652.47,
    "image":"plan2.png",
    "duration":"1 mes"},
    {"id":3,
    "name":"Plan Familiares",
    "description": ["Incluye una entrevista con un especialista","Plan detallado para todo el mes", "Videollamadas semanales","opiniones de expertos"],
    "price":4175.38,
    "image":"plan3.png",
    "duration":"6 meses"}
    ]


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
    res.render("./products/productDetail", {planes:listadoPlanes});
},

productDetail: (req, res) => {
    let id = req.params.id;

    let planEncontrado = listadoPlanes.filter(plan => plan.id == id);

    res.render("./products/productDetail", {planes:planEncontrado});
},

productLoad: (req, res) => {
    res.render("./products/productLoad");
},

productEdit: (req, res) => {
    res.render("./products/productEdit");
},


}