import mongoose from "mongoose";

const restaurantScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  chef:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish",
    required: false
  }],
});

const Restaurant = mongoose.model("Restaurant", restaurantScheme);

export default Restaurant;