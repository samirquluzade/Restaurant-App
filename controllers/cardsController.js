const multer = require("multer");
const sharp = require("sharp");
const Card = require("../models/cardModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(
      new AppError("Not an image! Please upload only images", 400),
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadCardPhoto = upload.single("image");
exports.resizeCardPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `card-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/cards/${req.file.filename}`);

  next();
});
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateCard = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "id",
    "name",
    "price",
    "priceDiscount",
    "category"
  );
  const curCard = await Card.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      card: curCard,
    },
  });
});
exports.getAllCards = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Card.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const cards = await features.query;
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: cards.length,
    data: {
      cards,
    },
  });
});
exports.createNewCard = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;
  const newCard = await Card.create({
    name: req.body.name,
    price: req.body.price,
    priceDiscount: req.body.priceDiscount,
    category: req.body.category,
    image: req.body.image,
  });
  res.status(201).json({
    status: "success",
    data: {
      card: newCard,
    },
  });
});

exports.getCard = catchAsync(async (req, res, next) => {
  const card = await Card.find({ category: req.params.category });
  const param = req.params.category;
  // Tour.findOne({ _id: req.params.id })
  if (!card) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      card,
      param,
    },
  });
});
exports.deleteCard = catchAsync(async (req, res, next) => {
  const deletedCard = await Card.findByIdAndDelete(req.params.id);
  if (!deletedCard) {
    return next(new AppError("No card found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: {
      deletedCard,
    },
  });
});
