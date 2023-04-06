const path = require("path");
const fs = require("fs");
const { create } = require("domain");
const { json } = require("express");
const bcrypt = require('bcryptjs'); //Para encriptar passwords
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
const db = require ('../data/models');
const User = db.User;
const UserRol = db.UserRol;

// Para llamadas con COUNT, LIKE, MAX, etc.
const Op = db.Sequelize.Op; 

module.exports = {
    login: (req, res) => {
        res.render("./users/login");
    },
    postLogin: (req, res) => {

        const { email, password, remember } = req.body;
        const loggedUser = users.find((user) => user.email === email);

        if (loggedUser) {
            let isCorrect = bcrypt.compareSync(password, loggedUser.password);

            if (!isCorrect) {
                console.log('contra incorrecta'); //esto desp se borra
                return res.redirect('/login')  //cuando existe y la contra es incorrecta
            }
        } else {
            console.log('mail no registrado') //esto desp se borra
            return res.redirect('/login'); //cuando no esta registrado el mail, entra acá
        }

        if (remember) {
            res.cookie("email", loggedUser.email, {maxAge: 60*60*24*31*1000})
        }

        req.session.email = loggedUser.email;

        console.log('inicio exitoso') //esto desp se borra
        return res.redirect('/'); //cuando existe y la contra es correcta entra aca
    },

    usuarioGetAll: (req, res) => {
        db.User.findAll({
            include: [{association: 'userRol'}]
        })
        .then(usuarios => {
            res.json(usuarios);
        })
    },

    register: (req, res) => {
        res.render("./users/register");
    },
    postRegister: (req, res) => {
        let newUser = users;
        const defaultImagePath = 'public\\img\\avatars\\default-image.jpg';
        let image = defaultImagePath;
        if (req.file !== undefined) {
          image = req.file.path;
        }
        let userData = {
            'id': users[users.length - 1].id + 1,
            'firstName': req.body.firstname,
            'lastName': req.body.lastname,
            'password': bcrypt.hashSync(req.body.password, 10),
            'email': req.body.email,
            'image': image

        };
        console.log(userData);
        newUser.push(userData);

        fs.writeFileSync(usersFilePath, JSON.stringify(newUser, null, ''));

        res.redirect('/login');
    }
}