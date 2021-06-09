const express = require("express");
const cardController = require("../controllers/cardsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(cardController.getAllCards);
router.post(
  "/create",
  cardController.uploadCardPhoto,
  cardController.resizeCardPhoto,
  cardController.createNewCard
);

router.route("/:category").get(cardController.getCard);
router.use(authController.protect);
router.patch("/updateCards/:id", cardController.updateCard);
router.route("/:id").delete(authController.protect, cardController.deleteCard);
module.exports = router;
