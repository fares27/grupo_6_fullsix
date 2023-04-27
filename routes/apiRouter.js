const express = require("express");
const router = express.Router();
const productsApiController = require("../controllers/apis/productsApiController.js");
const path = require("path");

router.get("/api/products",productsApiController.productAll); // API PRODUCTOS -- TRAER TODOS

router.get("/api/products/:id",productsApiController.product); // API PRODUCTOS -- TRAER TODOS

module.exports = router;