const path = require("path");
const fs = require("fs");
const { create } = require("domain");
//const { json } = require("express");
const bcrypt = require('bcryptjs'); //Para encriptar passwords
//const usersFilePath = path.join(__dirname, '../data/users.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
const db = require('../data/models');
const User = db.User;
const UserRol = db.UserRol;

const {
    check,
    validationResult,
    body
  } = require('express-validator');

// Para llamadas con COUNT, LIKE, MAX, etc.
const Op = db.Sequelize.Op;

module.exports = {
    login: (req, res) => {
        res.render("./users/login");
    },
    postLogin: async (req, res) => {

        const { email, password, remember} = req.body;

        // Busca al usuario en la base de datos usando Sequelize
        const user = await User.findOne({ where: { email } });
        let errors = validationResult(req);

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
            req.session.email = user;
            //console.log(user);

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
        //En esta variable guardo lo enviado desde la ruta, con respecto a los errores encontrados en la carga de los datos por parte del usuario
      let errors = validationResult(req);
      //return res.send(errors);
      //Aquí determino si hay ó no errores encontrados
      if(!errors.isEmpty()) {
        return res.render(path.resolve(__dirname, '../views/users/register'), {
          errors: errors.errors,  old: req.body
        });
      } 
        const defaultImagePath = 'default-image.jpg';
        let image = defaultImagePath;
        if (req.file !== undefined) {
            image = req.file.filename;
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
            .catch(error => console.log(error));
 

    }
}