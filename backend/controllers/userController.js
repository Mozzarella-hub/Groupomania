const { user } = require("../config/db");
const { post } = require("../config/db");
const { comment } = require("../config/db");
const { token } = require("../utils/jwt.utils");

// const { ValidationError } = require("sequelize");
const models = require("../models/");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt.utils");

// CRUD USER

// inscription
module.exports.signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const pseudo = req.body.pseudo;

  if (email == null || password == null || pseudo == null) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // VERIFICATION psueod lenght password ...
  user
    .findOne({
      attributes: ["email", "password"],
      where: { email: email, password: password},
    })
    .then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(password, 10, function () {
          const newUser = models.user;
          user
            .create({
              email: email,
              pseudo: pseudo,
              password: password,
              // bio: bio,
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
    return res.status(400).json({ error: "on cherche les paramètres LOGIN" });
  }
  //ON VERIF USER EXIST OR NOT
  user
    .findOne({
      where: { email: email },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      } else {
        bcrypt.compare(req.body.password, user.password).then((valid) => {
          if (!valid) {
            console.log(res);
            return res.status(401).json({ error: "Mot de passe incorrect." });
          } else {
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "48h",
            });
            const message = "L'utilisateur a été connecté avec succès";
            return res.status(200).json({ message, data: user, token });
          }
        });
      }
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être connecté, réessayez dans un instant.";
      return res.json({ message, data: error });
    });
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

exports.getAllUsers = (req, res, next) => {
  user.findAll({ attributes: { exclude: ["password"] } }).then((users) => {
    res.status(200).json(users);
  });
};

//Récupérer un seul utilisateur
exports.getOneUser = (req, res, next) => {
  user
    .findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ["password"] },
    })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ err: "id inconnu" });
      }
      res.status(200).json(user);
    });
};

// update user
exports.updateUser = (req, res, next) => {
  user
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ err: "id inconnu" });
      }
      user
        .update({
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash,
        })
        .then((user) => {
          res.status(201).json(user);
        });
    });
};

//Delete user
exports.deleteUser = (req, res) => {
  user
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ err: "id inconnu" });
      }
      user.destroy().then(() => {
        post.destroy({ where: { postId: req.params.id } }).then(() => {
          comment.destroy({ where: { commentId: req.params.id } }).then(() => {
            const message = "L'utilisateur et son contenu ont été supprimés";
            return res.status(200).json({ message });
          });
        });
      });
    });
};
