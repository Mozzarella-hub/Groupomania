//IMPORTS
const { user } = require("../config/db");
const jwt = require("../utils/jwt.utils");

const models = require("../models");
const bcrypt = require("bcrypt");

// inscription
module.exports.signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const pseudo = req.body.pseudo;

  if (email == null || password == null || pseudo == null) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // VERIFICATION psueod lenght password ...
  models.user
    .findOne({
      attributes: ["email"],
      where: { email: email },
    })
    .then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(password, 10, function (err, bcryptPassword) {
          const newUser = models.user
            .create({
              email: email,
              pseudo: pseudo,
              password: password,
              bio: bio,
              isAdmin: 0,
            })
            .then(function (newUser) {
              return res.status(201).json({
                userId: newUser.id,
              });
            });
        });
      } else {
        return res.status(409).json({ error: "user existe déjà Mr.Spock" });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ error: "Ne peut pas vérifier user" });
    });
};

//CONNEXION
module.exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email == null || password == null) {
    return res.status(400).json({'error': 'on cherche les paramètres LOGIN'})
  }
  //ON VERIF USER EXIST OR NOT 
  models.user
  .findOne({
    where: { email: email },
  })
  if (userFound) {
    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
      if(resBycrypt){
        return res.status(200).json({
          'userId': newUser.id,
          'token': jwt.generateToken(userFound)
        })
      }else{
        return res.status(403).json({ 'error' : 'password incorrect'})
      }
    });

  } else {
    return res.status(404).json({'error': 'user is not exist in database'});
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
