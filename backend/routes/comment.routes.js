const express = require("express");
const auth = require("../controllers/authController");
const router = express.Router();

const commentController = require("../controllers/commentController");

router.post("/", commentController.addComment);
router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getPostComments);
router.delete("/:id", commentController.deleteComment);
router.delete("/post/:id", commentController.deleteUserComments);
router.delete("/user/:id", commentController.deleteUserComments);

module.exports = router;