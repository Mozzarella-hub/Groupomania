/*
const user = require("../models/user");
//const { userModel } = require("../models/user");

//CRUD USER
module.exports.getAllUsers = (req, res) => {
  user.findAll({ attributes: { exclude: ["password"] } }).then((users) => {
    res.status(200).json(users);
  });
};

//Récupération un seul user
module.exports.userInfo = (req, res) => {
  user
    .findOne({
      where: {
        id: req.params.id,
      },
      //attributes: { exclude: ["password"] },
    })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ err: "id inconnu" });
      }
      res.status(200).json(user);
    })
    .select("-password");
  //RAPPEL ->select(-password) enlève le password même en front TEST
};

module.exports.updateUser = async (req, res, next) => {
  //On contrôle si l'ID passé en paramètre est connu
  user
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ err: "uknow id" });
      }
    });
  user
    .update({
      bio: req.body.bio,
    })
    .then((user) => {
      res.status(201).json(user);
    });
};

try {
        await userModel.findOneAndUpdate({
            where: {
              id: req.params.id
            },
            
                $set: {
                    bio: req.body.bio
                },
          
            { new: true, upsert: true, setDefaultsOnInsert: true}, 
            (err, docs =>{
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({message: err });
            })
        )
    }

module.exports.deleteUser = (req, res) => {
  user
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(400).send("ID unknow: " + req.params.id);
      }

      user.remove({ id: req.params.id }).exec();
      res.status(200).json({ message: "successfully deleted." });
    });

       user.destroy().then(() => {
      const message = "L'utilisateur a été supprimé.";
      res.status(200).json({ message });
    });
  


  module.exports.follow = async (req, res) => {
    //TEST déclaration id - de lignes
    const idUser = JSON.parse(req.body.id);

    if (!idUser.isValid(req.params.id) || !idUser.isValid(req.body.idToFollow))
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      // add to the followers liste
      await userModel.findOneAndUpdate(
        req.params.id,
        { $addToSet: { following: req.body.idToFollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).json(err);
        }
      );

      //add to following list
      await userModel.findAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          //if (!err) res.status(201).json(docs);
          if (err) return res.status(400).json(err);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

  module.exports.unfollow = async (req, res) => {
    const idUser = JSON.parse(req.body.id);
    if (
      !idUser.isValid(req.params.id) ||
      !idUser.isValid(req.body.idToUnfollow)
    )
      return res.status(400).send("ID unknown : " + req.params.id);

    try {
      await userModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { following: req.body.idToUnfollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).jsos(err);
        }
      );
      // remove to following list
      await userModel.findByIdAndUpdate(
        req.body.idToUnfollow,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          // if (!err) res.status(201).json(docs);
          if (err) return res.status(400).JSON(err);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };  
};
*/

  const bcrypt = require("bcrypt");
  const { user } = require("../config/db");
  const { ValidationError } = require("sequelize");
  const jwt = require("jsonwebtoken");


  // inscription
  exports.signup = (req, res, next) => {
    console.log('request');
    // console.log(req);
    console.log(req.body);
    // bcrypt.hash(req.body.password, 10).then((hash) => {
      user.create({
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: req.body.password,
      })
        .then((user) => {
          const message = `L'utilisateur ${req.body.pseudo} a bien été créé.`;
          res.status(201).json({ message, data: user });
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            return res
              .status(400)
              .json({ message: error.message, data: error });
          }
          const message =
            "L'utilisateur n'a pas pu être créé, veuillez rééssayer dans un instant.";
          res.status(500).json({ message, data: error });
        });
    // });
  };

  // connexion
  exports.login = (req, res, next) => {
    user.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: "Utilisateur non trouvé." });
        }
        bcrypt.compare(req.body.password, user.password).then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect." });
          }
          const token = jwt.sign({ userId: user.id }, {
            expiresIn: "24h",
          });
          const message = "L'utilisateur a été connecté avec succès";
          return res.status(200).json({ message, data: user, token });
        });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être connecté, réessayez dans un instant.";
        return res.json({ message, data: error });
      });
  };

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
      bcrypt.hash(req.body.password, 10).then((hash) => {
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
    });
  };

  //Delete user
  exports.deleteUser = (req, res, next) => {
    user.findOne({
      where: {
        id: req.params.id,
      },
    }).then((user) => {
      if (!user) {
        return res.status(400).json({ err: "id inconnu" });
      }
      user.destroy().then(() => {
        const message = "L'utilisateur a été supprimé.";
        res.status(200).json({ message });
      });
    });
  };
