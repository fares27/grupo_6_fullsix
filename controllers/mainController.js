const path = require("path");
const fs = require("fs");
const { create } = require("domain");


module.exports = {
index: (req, res) => {
    res.render("index");
}

}