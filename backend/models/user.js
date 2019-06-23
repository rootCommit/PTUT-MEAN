const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // pour ne pas enregistrer dans la DB le même utilisateur plusieurs fois

const userSchema = mongoose.Schema({
  firstname: {type: String, required: true}, // définition du type de l'attribut et s'il est requis
  lastname: { type: String, required: true },
  age: {type: Number, required: true},
  address: {type: String, required:true},
  city: {type: String, required: true},
  postalCode: {type: Number, required: true},
  country: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  // unique n'est pas un validateur, permet seulement une optimisation des performances
  // au niveau de Mongoose et mongoDB
  password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
