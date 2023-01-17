const path = require("path");


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

productDetail: (req, res) => {
    res.render("./products/productDetail");
},

productLoad: (req, res) => {
    res.render("./products/productLoad");
},

productEdit: (req, res) => {
    res.render("./products/productEdit");
},


}