const express = require("express");
const router = express.Router();
const productsApiController = require("../controllers/apis/productsApiController.js");
const path = require("path");

router.get("/api/products",productsApiController.productAll); // CARRITO DE COMPRAS

module.exports = router;