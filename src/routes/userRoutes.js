const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController');
const user = require('../controllers/userController');

// MIDDLEWARES
const fileUpload = require('../middlewares/multer');
const validations = require('../middlewares/validateRegister');
const validationsEditUser = require('../middlewares/validateEditUser');
const validationsLogin = require('../middlewares/validateLogin');
const guestMiddlware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const valChangePassword1 = require("../middlewares/passwordValidation1");
const valChangePassword2 = require("../middlewares/passwordValidation2");
const adminMiddleware = require("../middlewares/adminMiddleware")
const selfUserMiddleware = require("../middlewares/selfUserMiddleware")


router.get('/user/login', guestMiddlware,user.userLogin)
router.post('/user/userList', user.userLoginList)
router.post('/user/login', validationsLogin, user.loginProcess)


router.get('/user/list', authMiddleware,adminMiddleware, user.userList)
router.get('/user/profile', authMiddleware, user.userProfile)
router.get('/user/logout', user.logout)

// CREATE
router.get('/user/signup', user.userSignup);
router.post('/user/signup', fileUpload.single("profilePic"), validations, user.userCreateProcess);

// EDIT
router.get('/user/edit/:id', authMiddleware,selfUserMiddleware, user.userEdit)
router.put("/user/:id", fileUpload.single("profilePic"), validationsEditUser, user.userEditProcess)

// DELETE
router.delete("/user/delete/:id", authMiddleware, userControler.userDestroyProcess)

// // CHANGE PASSWORD
router.get("/user/edit/:id/changepassword", authMiddleware, userControler.passwordChange)
router.put("/user/edit/changepassword", authMiddleware, valChangePassword1, valChangePassword2, userControler.passwordChangeProcess)

module.exports = router