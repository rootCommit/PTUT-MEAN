const Product = require('../models/product');

exports.productCreate =  (req, res, next) => { // req = request, res = result
  // multer va essayer d'extraire un seul fichier de la requête et essayer de trouver une image dans le corps de cette requête
  const url = req.protocol + '://' + req.get("host");
  const product = new Product({
    reference: req.body.reference,
    imagePath: url + "/images/" + req.file.filename,
    price: req.body.price,
    description: req.body.description,
    brand: req.body.brand,
    color: req.body.color,
    weight: req.body.weight,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    category: req.body.category,
    creator: req.userData.userId
  });
  product.save().then(createdProduct => {
    res.status(201).json({
      message: 'Product added successfully',
      product: {
      /*  id: createdProduct._id,
        reference: createdProduct.reference,
        imagePath: createdProduct.imagePath,
        price: createdProduct.price,
        description: createdProduct.description,
        brand: createdProduct.brand,
        color: createdProduct.color,
        weight: createdProduct.weight,
        length: createdProduct.length,
        width: createdProduct.width,
        height: createdProduct.height

        Pour retourner tous les attributs du produit lors de la réponse du serveur

      */
      // alternative à ce pavé, voir ci-dessous
        ...createdProduct, // cela récupère directement tous les attributs du produit
        id: createdProduct._id // permet de ne pas avoir les problèmes de déclaration d'id avec la base de donnée
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Création du produit échouée'
    });
  });
}

exports.updateProduct = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if ( req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const product = new Product({
    _id: req.body.id, // à rajouter car on ne peut pas modifier l'id existant
    reference: req.body.reference,
    imagePath: imagePath,
    price: req.body.price,
    description: req.body.description,
    brand: req.body.brand,
    color: req.body.color,
    weight: req.body.weight,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    category: req.body.category,
    creator: req.userData.userId
  });
  // console.log(product);
  Product.updateOne({_id: req.params.id, creator: req.userData.userId }, product).then( result => {
    // console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: "Update successful"});
    } else {
      res.status(401).json({ message: "Not authorized"});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Echec de la mise à jour du produit'
    });
  });
}

exports.getProducts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const productQuery = Product.find();

  let fetchedProducts;

  if (pageSize && currentPage) {
    productQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  productQuery.then(documents => {
      fetchedProducts = documents;
      return Product.countDocuments();
    })
      .then(count => {
        res.status(200).json({
          message: "Products fetched successfully",
          products: fetchedProducts,
          maxProducts: count
        })
    /*
        return data in JSon format
        tache asynchrone, si en dehors, NodeJS exécute Product.find() puis
        res.status , sans que Product.find() ait terminé l'exécution

          Pb entre front-end model et back-end model,
          Model front-end a un champ id
          Model back-end a un champ _id (MongoDB)
          1° sol : rajouter .map() à la ligne 57 pour modifier les champs
          afin que le model front-end corresponde à celui du back-end
        */
      })
      .catch(error => {
        res.status(500).json({
          message: 'Données introuvables'
        });
      });
}

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      if(product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({message: 'Product not found'});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Données introuvables'
      });
    });
}

exports.getByFilter =  (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const pCategory = req.query.category;
  const productQuery = Product.find({ category: pCategory });

  let fetchedProducts;

  if (pageSize && currentPage) {
    productQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  productQuery.then(documents => {
      fetchedProducts = documents;
      return Product.countDocuments();
    })
      .then(count => {
        res.status(200).json({
          message: "Products fetched successfully",
          products: fetchedProducts,
          maxProducts: count
        })

      })
      .catch(error => {
        res.status(500).json({
          message: 'Données introuvables'
        });
      });
}

exports.deleteProduct = (req, res, next) => {

  Product.deleteOne({ _id: req.params.id, creator: req.userData.userId })
  .then(result => {
      // console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Product deleted" });
      } else {
        res.status(401).json({ message: "Not authorized"});
      }
  })
  .catch(error => {
    res.status(500).json({
      message: 'Données introuvables'
    });
  });
}
