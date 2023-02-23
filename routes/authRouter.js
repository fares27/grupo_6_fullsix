
// REQUIRES GENERALES
const express = require("express");
const router = express.Router();
const path = require("path");

// CONTROLADOR
const authController = require("../controllers/authController");

// MULTER
const multer = require ('multer');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, './public/img/avatars'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })

const uploadFile = multer({ storage });

// RUTAS

router.get("/login", authController.login); // LOGIN USUARIO
  
router.get("/register", authController.register); // REGISTRO DE USUARIO

router.post("/register", uploadFile.single('image'), authController.registerUser); // REGISTRO DE USUARIO -- CREACION DEL USUARIO

module.exports = router;