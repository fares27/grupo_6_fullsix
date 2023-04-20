const express = require("express");

const router = express.Router();
const mainController = require("../controllers/mainController")
const path = require("path");

// Vista a ejecutar en el Home
router.get("/", mainController.index);  // HOME 
router.get("/contact", mainController.contact);
  
module.exports = router;
