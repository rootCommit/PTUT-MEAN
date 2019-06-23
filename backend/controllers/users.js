const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hash
      //  password: req.body.password
      // ne pas enregistrer les mdp de cette façon, ils ne seront pas cachés.
      // on installe bcrypt.js qui est un module permettant de crypter des chaînes de caractères
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'Données d\'authentification invalides'
          });
        });
    });
  }

  exports.userLogin = (req, res, next) => {
    let fetchedUser;
   User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Authentification échouée"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Authentification échouée"
        });
      }

      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Authentification échouée",
        error: err
      });
    });
  }
