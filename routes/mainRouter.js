const express = require("express");

const router = express.Router();
const mainController = require("../controllers/mainController")
const path = require('path');


// Vista a ejecutar en el Home
router.get("/", mainController.index);
  
  router.get("/login", mainController.login);
  
  router.get("/productCart", mainController.productCart);
  
  router.get("/products", mainController.productDetail);
  
  router.get("/register", mainController.register);
  
  router.get("/products/create", mainController.productLoad);

  router.get("/products/:id/edit", mainController.productEdit);

module.exports = router;
