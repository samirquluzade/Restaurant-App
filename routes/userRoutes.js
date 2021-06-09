const express = require("express");
const userController = require("../controllers/userController");
const cardController = require("../controllers/cardsController");
const authController = require("../controllers/authController");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch(
  "/updateUser/:id",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateUser
);
router.route("/:id").delete(authController.protect, userController.deleteUser);
module.exports = router;
