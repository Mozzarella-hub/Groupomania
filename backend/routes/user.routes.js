//Imports
const express = require("express");
const router = express.Router();


const userCtrl = require("../controllers/userController");
//const uploadController = require('../controllers/upload.controller');

//User route
router.post("/signup",  userCtrl.signup);
router.post("/login", userCtrl.login);

//récupérer tous les users
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);
// router.patch('/follow/:id', userController.follow);
// router.patch('/unfollow/:id', userController.unfollow);

// upload
// router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;
