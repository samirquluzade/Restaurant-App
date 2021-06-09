const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Yeməyin adını daxil edin!"],
      unique: true,
      trim: true,
      maxlength: [20, "Yeməyin adının uzunluğu 20 simvoldan çox olmamalıdır!"],
      minlength: [5, "Yeməyin adının uzunluğu 5 simvoldan az olmamalıdır!"],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    price: {
      type: Number,
      required: [true, "Qiyməti əlavə edin!"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    category: {
      type: String,
      required: [true, "Kateqoriyanı əlavə edin!"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    secretCard: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: [true, "Şəkil əlavə edin!"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//DOCUMENT MIDDLEWARE: runs before .save() and .create()
cardSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// QUERY MIDDLEWARE
cardSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
// AFTER EXECUTE
cardSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});
const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
