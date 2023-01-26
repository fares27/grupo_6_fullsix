const path = require("path");
const fs = require("fs");
const { create } = require("domain");

module.exports = {
    login: (req, res) => {
        res.render("./users/login");
    },
    
    register: (req, res) => {
        res.render("./users/register");
    }
}