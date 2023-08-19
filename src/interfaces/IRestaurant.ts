import mongoose from "mongoose";

export interface IRestaurant {
  name: string;
  image: string;
  chef: mongoose.Schema.Types.ObjectId;
  dishes: mongoose.Schema.Types.ObjectId[];
  is_active: boolean;
  ranking: string;
}
