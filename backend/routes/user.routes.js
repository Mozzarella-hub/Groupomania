/*
const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');


const multer = require('multer');
const upload = multer();

//auth
router.post('/register', authController.signUp);
router.post('/register', authController.signIn);
router.get('/logout', authController.logout);

// user display: bloack
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

//  upload
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;
*/


// -------------------------------- REPRISE --------------------------------//



const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/userController");
const authController = require('../middleware/auth.middleware');
//const uploadController = require('../controllers/upload.controller');

//inscription
router.post("/signup",  authController.signup);
router.post("/login", authController.login);

//récupérer tous les users
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getOneUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);
// router.patch('/follow/:id', userController.follow);
// router.patch('/unfollow/:id', userController.unfollow);

// //  upload
// router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;
