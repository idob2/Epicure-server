import mongoose from "mongoose";

export interface IDish {
  name: string;
  price: number;
  image: string;
  ingredients: string;
  tags: string;
  restaurant: mongoose.Schema.Types.ObjectId;
  is_active: Boolean;
}
