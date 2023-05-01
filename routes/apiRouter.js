const express = require("express");
const router = express.Router();
const productsApiController = require("../controllers/apis/productsApiController.js");
const usersApiController = require("../controllers/apis/usersApiController.js");
const path = require("path");

router.get("/api/products",productsApiController.productAll); // API PRODUCTOS -- TRAER TODOS

router.get("/api/products/:id",productsApiController.product); // API PRODUCTO -- TRAER POR ID

router.get("/api/categorys", productsApiController.categorys); // TRAER TODAS LAS CATEGORIAS


router.get("/api/users",usersApiController.users); // API USUARIOS -- TRAER TODOS

router.get("/api/users/:id",usersApiController.userDetail); // API USUARIO -- TRAER POR ID

module.exports = router;