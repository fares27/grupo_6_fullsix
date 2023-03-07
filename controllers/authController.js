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
    postLogin: (req, res) => {
        console.log(req.body);
        const { email, password} = req.body;
        const loggedUser = users.find((user) => user.email === email);

        if (loggedUser) {
            let isCorrect = bcrypt.compareSync(password, loggedUser.password);

            if (!isCorrect) {
                console.log('contra incorrecta'); //esto desp se borra
                return res.redirect('/login')  //cuando existe y la contra es incorrecta
            }
        }else {
            console.log('mail no registrado') //esto desp se borra
                return res.redirect('/login'); //cuando no esta registrado el mail, entra acá
            }
            console.log('inicio exitoso') //esto desp se borra
            return res.redirect('/'); //cuando existe y la contra es correcta entra aca
        },
    

    register: (req, res) => {
        res.render("./users/register");
    },
    postRegister: (req, res) => {
        let newUser = users;
        let userData = {
            'id' : users[users.length - 1].id + 1,
            'firstName': req.body.firstname,
            'lastName': req.body.lastname,
            'password': bcrypt.hashSync(req.body.password, 10),
            'email': req.body.email,
            'image': req.file.path

        };
        console.log(userData);
        newUser.push(userData);

        fs.writeFileSync(usersFilePath, JSON.stringify(newUser, null, ''));

        res.redirect('/login');
    }
}