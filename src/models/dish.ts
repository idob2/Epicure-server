import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: false,
  },
});

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
