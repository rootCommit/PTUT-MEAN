const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const app = express();
// ligne en dessous doit rester à la ligne 10 !!!
mongoose.connect("mongodb+srv://tlaguerie:" + process.env.MONGO_ATLAS_PW + "@ptutmean-uvm1w.mongodb.net/PTUTMEAN", {useNewUrlParser: true, useCreateIndex: true})
//mongoose.connect("mongodb://localhost:27017/MyPTUT", { useNewUrlParser: true, useCreateIndex: true})
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
// Permet de définir l'accès et l'utilisation de certaines méthodes.

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
 });

 /*
  /api/products dans cette requête permet d'appliquer un filtre
  Pour chaque requête provenant de la constante productsRoutes, donc du fichier
  /routes/products.js, chacune aura /api/products dans son url, plus le paramètre
  d'adresse url qui lui aura été donné dans le fichier.
  Exemple : l'url lorsqu'on utilise la méthode router.put()
  sera " localhost:3000/api/products/(id de l'objet modifié) "
*/
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);

module.exports = app;
