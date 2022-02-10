const jwt = require('jsonwebtoken');
//const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const { ValidationError } = require("sequelize");
const { user } = require("../config/db");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

  // inscription
  exports.signup = (req, res, next) => {
    console.log('request');
    // console.log(req);
    console.log(req.body);
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

  };


//CONNEXION
module.exports.login = async (req, res) => {
    user.findOne({
            where: {
              email: req.body.email,
            },
          })
            .then((user) => {
              if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
              }
              user.compare(req.body.password, user.password).then((valid) => {
                if (!valid) {
                  return res.status(401).json({ error: "Mot de passe incorrect." });
                }
                const token = createToken(user.id);
                res.cookie('jwt', token, { httpOnly: true, maxAge});
                res.status(200).json({ user: user.id})
                console.log(token);
                const message = "L'utilisateur a été connecté avec succès";
                return res.status(200).json({ message, data: user, token });
              });
            })
            .catch((error) => {
              const message =
                "L'utilisateur n'a pas pu être connecté, réessayez dans un instant.";
              return res.json({ message, data: error });
            });
}


module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}