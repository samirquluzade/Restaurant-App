const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new AppError("Yalnız şəkil əlavə edin!", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadUserPhoto = upload.single("photo");
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);

  next();
});
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("+password");
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
exports.createNewUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      users: newUser,
    },
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("Şifrə yeniləmək üçün /updateMyPassword istifadə edin!", 400)
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "id",
    "role",
    "name",
    "surname",
    "email"
  );
  const curUser = await User.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: curUser,
    },
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: {
      deletedUser,
    },
  });
});
