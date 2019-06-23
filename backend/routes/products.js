/*
  Ici, nous réorganisons les routes.
  On exporte la constante router qui est importé ensuite dans app.js .
*/
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const productController = require('../controllers/products');

router.post("",
  checkAuth,
  extractFile,
  productController.productCreate);

router.get("/filtres/+:category", productController.getByFilter);

router.get("", productController.getProducts);
// Methode put() : supprime l'ancienne ressource et place une nouvelle à la place
// Methode patch() : met à jour une ressource existante

router.put("/:id",
  checkAuth,
  extractFile,
  productController.updateProduct
);

router.get("/:id", productController.getProduct);

// Suppression d'un produit côté back-end

router.delete("/:id", checkAuth, productController.deleteProduct);


module.exports = router;
