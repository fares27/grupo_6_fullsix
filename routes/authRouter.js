// REQUIRES GENERALES
const express = require("express");
const router = express.Router();
const path = require("path");
//Aquí requiero la Base  de Datos.   Esto lo hago para validar si el usuario está o no ya registrado
const db = require('../data/models/');

//Aquí creo hago la asociación al módelo correspondiente
const User = db.User;


//Requiero el paquete expres-validator
const {
    check,
    validationResult,
    body
} = require('express-validator');


// CONTROLADOR
const authController = require("../controllers/authController");

// MULTER
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/avatars");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  },
});

const uploadFile = multer({ storage });

//MIDDLEWARE PARA EVITAR ENTRAR A LOGIN SI YA EXISTE UN SESSION
const avoidLoginAccess = (req, res, next) => {
  if (req.session.email) {
    return res.redirect("/");
  }
  next();
};
// RUTAS

router.get("/login", avoidLoginAccess, authController.login); // LOGIN USUARIO

router.post("/login", [
  check('email').isEmail().withMessage('Email invalido'),
  check('password').isLength({ min: 8, max: 15 }).matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
  ).withMessage('La contraseña debe tener al menos 8 caracteres'),
], authController.postLogin);

router.get("/register", authController.register); // REGISTRO DE USUARIO

User.findAll()
    .then((users) => {
router.post(
  "/register",
  uploadFile.single("image"),[
    //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
    check('firstname').isLength({
          min: 2
        }).withMessage('El campo nombre no puede estar vacío'),
    check('lastname').isLength({min: 2  
        }).withMessage('El campo apellido no puede estar vacío'),
    check('email').isEmail().withMessage('Agregar un email válido'),

    //Aquí valido el Password   
    check('password').isLength({ min: 8, max: 15 }).matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/).withMessage('La contraseña debe tener un mínimo de 6 caractéres al menos una letra y un número'),
      body('email').custom(function (value) {
        let contador = 0;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == value) {
                contador++;
            }
        }
        if (contador > 0) {
            return false;   // Si retorno falso no aparece el mensaje de error
        } else {
            return true;    //Si retorno true, aparece el mensaje de error
        }
      }).withMessage('Usuario ya se encuentra registrado')
  ],
authController.postRegister)  })
.catch((errors) => {
    console.log(errors);
}) // REGISTRO DE USUARIO -- CREACION DEL USUARIO

router.get("/usuariosAll", authController.usuarioGetAll);

router.get("/logout", authController.logout);

module.exports = router;
