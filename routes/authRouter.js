const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController")

const path = require("path");

router.get("/login", authController.login); // LOGIN USUARIO
  
router.get("/register", authController.register); // REGISTRO DE USUARIO


module.exports = router;