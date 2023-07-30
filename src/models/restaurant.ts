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
    ref: "Chef",
    required: true
  },
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish",
    required: true
  }],
  is_active: {
    type:Boolean,
    required: true
  },
  ranking: {
    type: String,
    required: true
  }
});

const Restaurant = mongoose.model("Restaurant", restaurantScheme);

export default Restaurant;