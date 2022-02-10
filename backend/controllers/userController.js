const { user } = require("../config/db");
const { post } = require("../config/db");
const { comment } = require("../config/db");

  // CRUD USER
  //Récupérer tous les users
  exports.getAllUsers = (req, res, next) => {
    user.findAll({ attributes: { exclude: ["password"] } }).then((users) => {
      res.status(200).json(users);
    });
  };

  //Récupérer un seul utilisateur
  exports.getOneUser = (req, res, next) => {
    user.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ["password"] },
    }).then((user) => {
      if (!user) {
        return res.status(400).json({ err: "id inconnu" });
      }
      res.status(200).json(user);
    });
  };

  // update user
  exports.updateUser = (req, res, next) => {
    user.findOne({
      where: {
        id: req.params.id,
      },
    }).then((user) => {
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
    user.findOne({
      where: {
        id: req.params.id,
      },
    }).then((user) => {
      if (!user) {
        return res.status(400).json({ err: "id inconnu" });
      }
      user.destroy().then(() => {
        post.destroy({ where: { postId: req.params.id } }).then(() => {
          comment.destroy({ where: { commentId: req.params.id } }).then(() => {
            const message =
              "L'utilisateur et son contenu ont été supprimés";
            return res.status(200).json({ message });
          });
        });
      });
    });
  }
