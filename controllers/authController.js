const path = require("path");
const fs = require("fs");
const { create } = require("domain");
const { json } = require("express");
const bcrypt = require('bcryptjs'); //Para encriptar passwords
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
const db = require('../data/models');
const User = db.User;
const UserRol = db.UserRol;

// Para llamadas con COUNT, LIKE, MAX, etc.
const Op = db.Sequelize.Op;

module.exports = {
    login: (req, res) => {
        res.render("./users/login");
    },
    postLogin: async (req, res) => {

        // const loggedUser = users.find((user) => user.email === email);

        //     if (loggedUser) {
        //         let isCorrect = bcrypt.compareSync(password, loggedUser.password);

        //         if (!isCorrect) {
        //             console.log('contra incorrecta'); //esto desp se borra
        //             return res.redirect('/login')  //cuando existe y la contra es incorrecta
        //         }
        //     } else {
        //         console.log('mail no registrado') //esto desp se borra
        //         return res.redirect('/login'); //cuando no esta registrado el mail, entra acá
        //     }

        //     if (remember) {
        //         res.cookie("email", loggedUser.email, { maxAge: 60 * 60 * 24 * 31 * 1000 })
        //     }
        // Guarda el correo electrónico del usuario en la sesión

        const { email, password, remember } = req.body;

        // Busca al usuario en la base de datos usando Sequelize
        const user = await User.findOne({ where: { email } });

        // Si el usuario no existe, redirige a la página de inicio de sesión con un mensaje de error
        if (!user) {
            console.log("mail email")
            return res.render('users/login', { error: 'El usuario no esta registrado' });
        }

        // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
        const match = await bcrypt.compare(password, user.password);

        // Si las contraseñas no coinciden, redirige a la página de inicio de sesión con un mensaje de error
        if (!match) {
            console.log('contraseña incorrecta')
            return res.render('users/login', { error: 'El correo electrónico o la contraseña son incorrectos' });
        } else {
            console.log("inicio sesion")
            // Si el usuario ha seleccionado "recordar sesión", crea una cookie que expire después de 30 días
            if (remember) {
                console.log("guardo cookie")
                res.cookie('remember', true, { maxAge: 30 * 24 * 60 * 60 * 1000 });
            }

            // Guarda el correo electrónico del usuario en la sesión
            req.session.email = email;

            // Redirige al usuario a la página principal
            res.redirect('/');
        }
    },


    //     console.log('inicio exitoso') //esto desp se borra
    // res.redirect('/'); //cuando existe y la contra es correcta entra aca
    //  },
    logout: (req,res) =>{
        req.session.destroy();
        res.cookie('remember',null,{maxAge: -1});
        res.redirect('/')
    },

    usuarioGetAll: (req, res) => {
        db.User.findAll({
            include: [{ association: 'userRol' }]
        })
            .then(usuarios => {
                res.json(usuarios);
            })
    },

    register: (req, res) => {
        res.render("./users/register");
    },
    postRegister: (req, res) => {
        // let newUser = users;
        const defaultImagePath = 'public\\img\\avatars\\default-image.jpg';
        let image = defaultImagePath;
        if (req.file !== undefined) {
            image = req.file.path;
        }
        const _body = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            id_rol: "2",
            image: image
        }

        User.create(_body)
            .then(user => {
                res.redirect('/login');
            })
        // let userData = {
        //     'id': users[users.length - 1].id + 1,
        //     'firstName': req.body.firstname,
        //     'lastName': req.body.lastname,
        //     'password': bcrypt.hashSync(req.body.password, 10),
        //     'email': req.body.email,
        //     'image': image

        // };
        // console.log(userData);
        // newUser.push(userData);

        // fs.writeFileSync(usersFilePath, JSON.stringify(newUser, null, ''));

        // res.redirect('/login');


    }
}