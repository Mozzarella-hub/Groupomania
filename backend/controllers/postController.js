const { post } = require("../config/db");

// récupérer tous les posts
// CRUD POST
module.exports.getAllPosts = (req, res, next) => {
  post.findAll({
    order: [["createdAt", "DESC"]],
  }).then((posts) => {
    const message = "Voici tous les posts.";
    return res.status(200).json({ message, data: posts });
  });
};

//Récupérer un post
module.exports.getOnePost = (req, res, next) => {
  post.findByPk(req.params.id).then((post) => {
    const message = "Voici le post choisi.";
    return res.status(200).json({ message, data: post });
  });
};

// Ajouter un post
module.exports.addPost = (req, res, next) => {
  post.create(req.body).then((post) => {
    const message = "Votre mesage a été créé.";
    return res.status(201).json({ message, data: post });
  });
};

//Modifier un post
module.exports.updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  post.update(req.body, {
    where: {
      id: id,
    },
  }).then(() => {
    post.findByPk(id).then((post) => {
      const message = `Le post ${post.title} a bien été modifié.`;
      return res.status(200).json({ message, data: post });
    });
  });
};

//Supprimer un post
module.exports.deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  post.findByPk(id).then((post) => {
    post.destroy().then(() => {
      const message = "Le post a bien été supprimé.";
      return res.status(200).json({ message });
    });
  });
};

//Supprimer tous les posts d'un utilisateur
module.exports.deleteUserPosts = (req, res, next) => {
  const id = parseInt(req.params.id);
  post.destroy({ where: { posterId: id } }).then(() => {
    const message = "Tous les posts ont été supprimés";
    return res.status(200).json({ message });
  });
};
