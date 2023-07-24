import mongoose from "mongoose";

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  restaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: false
  }],
});

const Chef = mongoose.model("Chef", chefSchema);

export default Chef;