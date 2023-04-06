
// REQUIRES GENERALES
const express = require("express");
const router = express.Router();
const path = require("path");

// CONTROLADOR
const authController = require("../controllers/authController");

// MULTER
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/img/avatars');
   },
   filename: function (req, file, cb) {
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
   }
})

const uploadFile = multer({ storage });

//MIDDLEWARE PARA EVITAR ENTRAR A LOGIN SI YA EXISTE UN SESSION
const avoidLoginAccess = (req, res, next) => {
   if (req.session.email) {
     return res.redirect('/');
   }
   next();
 }
// RUTAS

router.get("/login", avoidLoginAccess, authController.login); // LOGIN USUARIO

router.post("/login", authController.postLogin);

router.get("/register", authController.register); // REGISTRO DE USUARIO

router.post("/register", uploadFile.single('image'), authController.postRegister); // REGISTRO DE USUARIO -- CREACION DEL USUARIO

router.get("/usuariosAll", authController.usuarioGetAll);

module.exports = router;