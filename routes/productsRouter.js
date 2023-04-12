const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const path = require("path");

// MULTER
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './public/img/products');
   },
   filename: function (req, file, cb) {
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
   }
})

const uploadFileProduct = multer({ storage });

// MIDDLEWARE PARA VERIFICAR SI EL USUARIO ESTA AUTENTICADO
const authMiddleware = (req, res, next) => {
    if (!req.session.email) {
const authMiddleware = (req, res, next) => {
    next();
  };
    }}


router.get("/productCart", authMiddleware,productsController.productCart); // CARRITO DE COMPRAS

router.get("/products/create", productsController.productFormLoad); // FORMULARIO DE CREACION DE PRODUCTO // CREATE GET

router.post("/products", productsController.productCreate); // FORMULARIO DE ENVIO DE CREACION DE PRODUCTO // CREATE POST
router.post("/products",uploadFileProduct.single('image'), productsController.productCreate); // FORMULARIO DE ENVIO DE CREACION DE PRODUCTO // CREATE POST

router.get("/products", productsController.products); // LISTADO DE PLANES (PRODUCTOS) // READ ALL

router.get("/products/:id/", productsController.productDetail); //  LISTADO DE PLAN (PRODUCTO) // READ ONLY 
router.get("/products/:id/edit", productsController.productFormEdit); // FORMULARIO DE EDICION DE PRODUCTO // UPDATE GET
router.put("/products/:id/", productsController.productEdit); // FORMULARIO DE ENVIO DE EDICION DE PRODUCTO // UPDATE PUT
router.delete("/products/:id/", productsController.productDelete); // FORMULARIO DE ENVIO DE ORDEN DE ELIMINACION
router.get("/productsAll", productsController.productAll); // Prueba de traerme todos los productos
router.get("/cartsAll", productsController.cartAll); // Prueba de traerme todos los productos
module.exports = router;