const mongoose = require('mongoose');

//Schéma d'un produit stocké dans MongoDB

const productSchema = mongoose.Schema({
  reference: {type: String, required: true}, // définition du type de l'attribut et s'il est requis
  imagePath: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required:true },
  brand: { type: String, required: true },
  category: {type: String, required: true},
  color: String,
  weight: Number,
  length: Number,
  width: Number,
  height: Number,
  creator: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true }
});
// Model issu du Schema productSchema
module.exports = mongoose.model('Product', productSchema);
