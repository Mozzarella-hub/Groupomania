/*
const router = require('express').Router();
const postController = require('../controllers/postController');
const multer = require('multer');
const upload = multer();

router.get('/', postController.readPost);
router.post('/', upload.single('file'),postController.createPost);
router.post('/:id', postController.updatePost);
router.post('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/like-post/:id', postController.unlikePost);

// comments
router.patch('/comment-post/:id', commentController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-post/:id', postController.deleteCommentPost);

module.exports = router;
*/


const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);
router.post("/", postController.addPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.delete("/user/:id", postController.deleteUserPosts);

module.exports = router;