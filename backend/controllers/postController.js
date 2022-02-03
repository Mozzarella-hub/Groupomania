/*
const fs = require('fs');
const db = require('../models');
const { Post } = require('../server');

exports.createPost = async (req, res, next) => {
  let postObject = req.body

  if (req.file) {
    postObject = JSON.parse(req.body.post)
    postObject.imageUrl = `${req.protocol}://${req.get('host')}/public/${
      req.file.filename
    }`
  }

  try {
    let post = await Post.create({
      ...postObject,
      user_Id: req.user.id
    })

    post = await Post.findOne({ where: { id: post.id }, include: db.user })

    res.status(201).json({ post })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.user
      }
    ]
  })
    .then(post => res.status(200).json({ post }))
    .catch(error => res.status(404).json({ error }))
}

exports.getAllPosts = (req, res, next) => {
  const limit = 4
  const page = parseInt(req.query.page) || 1

  const options = {
    include: [
      {
        model: db.user
      }
    ],
    limit,
    offset: limit * (page - 1),
    order: [['createdAt', 'DESC']]
  }

  if (req.query.user_id) {
    options.where = {
      user_id: parseInt(req.query.user_id)
    }
  }

  Post.findAll(options)
    .then(posts => res.status(200).json({ posts }))
    .catch(error => res.status(400).json({ error }))
}

exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/public/${
          req.file.filename
        }`
      }
    : { ...req.body }

  Post.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: db.user
  }).then(post => {
    if (!post) {
      res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
    } else {
      post.update(postObject).then(post => res.status(200).json({ post }))
    }
  })
}

exports.deletePost = (req, res, next) => {
  const where = {
    id: req.params.id
  }

  if (!req.user.admin) {
    where.user_id = req.user.id
  }

  Post.findOne({ where })
    .then(post => {
      if (!post) {
        res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
      }
      post
        .destroy()
        .then(() =>
          res.status(200).json({ message: 'Publication supprimée !' })
        )
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
*/

const { Post } = require("../config/db");

// récupérer tous les posts
module.exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
  }).then((posts) => {
    const message = "Voici tous les posts.";
    return res.status(200).json({ message, data: posts });
  });
};

//Récupérer un post
module.exports.getOnePost = (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    const message = "Voici le post choisi.";
    return res.status(200).json({ message, data: post });
  });
};

// Ajouter un post
module.exports.addPost = (req, res, next) => {
  Post.create(req.body).then((post) => {
    const message = "Votre mesage a été créé.";
    return res.status(201).json({ message, data: post });
  });
};

//Modifier un post
module.exports.updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  Post.update(req.body, {
    where: {
      id: id,
    },
  }).then(() => {
    Post.findByPk(id).then((post) => {
      const message = `Le post ${post.title} a bien été modifié.`;
      return res.status(200).json({ message, data: post });
    });
  });
};

//Supprimer un post
module.exports.deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  Post.findByPk(id).then((post) => {
    post.destroy().then(() => {
      const message = "Le post a bien été supprimé.";
      return res.status(200).json({ message });
    });
  });
};

//Supprimer tous les posts d'un utilisateur
module.exports.deleteUserPosts = (req, res, next) => {
  const id = parseInt(req.params.id);
  Post.destroy({ where: { posterId: id } }).then(() => {
    const message = "Tous les posts ont été supprimés";
    return res.status(200).json({ message });
  });
};