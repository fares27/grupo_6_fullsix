const path = require("path");
const fs = require("fs");
const { create } = require("domain");
const { json } = require("express");
const bcrypt = require('bcryptjs'); //Para encriptar passwords

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));


module.exports = {
    login: (req, res) => {
        res.render("./users/login");
    },
    
    register: (req, res) => {
        res.render("./users/register");
    },
    registerUser: (req, res) => {
        let newUser = users;
        let userData = {
            'firstName' : req.body.firstname,
            'lastName': req.body.lastname,
           'password': bcrypt.hashSync(req.body.password, 10),
            'email' : req.body.email,
            'image' : req.file.path
            
        };
        console.log(userData);
        newUser.push(userData);

        fs.writeFileSync(usersFilePath, JSON.stringify(newUser, null, ''));

        res.redirect('/login');
        
    }
}