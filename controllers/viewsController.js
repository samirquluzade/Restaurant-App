// const Card = require('../models/cardModel');
const User = require("../models/userModel");
const authController = require("../controllers/authController");
const Card = require("./../models/cardModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const Email = require("../utils/email");
exports.getOverview = catchAsync(async (req, res, next) => {
  const cards = await Card.find().limit(4);
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("overview", {
      title: "Welcome to this page",
      cards,
    });
});
exports.getCard = catchAsync(async (req, res, next) => {
  const cards = await Card.find({ category: req.params.category });
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("card", {
      title: "Yemekler",
      cards,
    });
});
exports.getDiscount = catchAsync(async (req, res, next) => {
  const cards = await Card.find();
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("discount", {
      title: `Kampaniyalar`,
      cards,
    });
});
exports.getUpdate = catchAsync(async (req, res, next) => {
  const curUser = await User.findById(req.params.id);
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("updateUsers", {
      title: "Welcome to this page",
      curUser,
    });
});
exports.getUpdateCards = catchAsync(async (req, res, next) => {
  const curCard = await Card.findById(req.params.id);
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("updateCards", {
      title: "Welcome to this page",
      curCard,
    });
});
exports.getNewCard = catchAsync(async (req, res, next) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("createNewCard", {
      title: "Welcome to this page",
    });
});
exports.getManageCards = catchAsync(async (req, res, next) => {
  const cards = await Card.find();
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("manageCards", {
      title: "Welcome to this page",
      cards,
    });
});
exports.getManageUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("manageUsers", {
      title: "Welcome to this page",
      users,
    });
});

exports.getLogin = (req, res) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("login", {
      title: "Hesaba daxil ol",
    });
};
exports.getSignUp = (req, res) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("signup", {
      title: "Qeydiyyatdan keç",
    });
};
exports.getAccount = (req, res) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("account", {
      title: "Hesabınız",
    });
};
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("account", {
      title: "Hesabınız",
      user: updatedUser,
    });
});

// exports.getResetToken = (req, res) => {
//   res
//     .status(200)
//     .set(
//       "Content-Security-Policy",
//       "connect-src 'self' https://cdnjs.cloudflare.com"
//     )
//     .render("resetPassword", {
//       title: "Şifrəni sıfırlamaq",
//       token: req.params.token,
//     });
// };
