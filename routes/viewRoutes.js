const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getOverview);
router.get("/login", authController.isLoggedIn, viewsController.getLogin);
router.get("/signup", authController.isLoggedIn, viewsController.getSignUp);
router.get(
  "/kampaniyalar",
  authController.isLoggedIn,
  viewsController.getDiscount
);
router.get("/me", authController.protect, viewsController.getAccount);
router.post(
  "/submit-user-data",
  authController.protect,
  viewsController.updateUserData
);
router.get(
  "/users/updateUser/:id",
  authController.protect,
  viewsController.getUpdate
);
router.get(
  "/cards/updateCards/:id",
  authController.protect,
  viewsController.getUpdateCards
);
router.get(
  "/cards/createNewCard",
  authController.protect,
  viewsController.getNewCard
);
router.get(
  "/manageCards",
  authController.protect,
  viewsController.getManageCards
);
router.get(
  "/manageUsers",
  authController.protect,
  viewsController.getManageUsers
);
router.get("/:category", authController.isLoggedIn, viewsController.getCard);

module.exports = router;
