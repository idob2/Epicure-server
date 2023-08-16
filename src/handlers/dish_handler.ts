import { ObjectId } from "mongodb";
import Dish from "../models/dish";
import { Types } from "mongoose";

const findAllDishes = async () => {
  const allDishes = await Dish.find({
    is_active: true
  });
  return allDishes;
};

const findDishById = async (dishId: string) => {
  const dish = await Dish.findById({ _id: dishId, is_active: true });
  return dish;
};

const addDish = async (
  dishId: ObjectId,  
  name: string,
  price: number,
  image: string,
  ingredients: string,
  tags: string,
  restaurant: ObjectId
) => {
  const newDish = new Dish({
    _id: dishId,
    name: name,
    price: price,
    image: image,
    ingredients: ingredients,
    tags: tags,
    restaurant: restaurant,
    is_active: true
  });

  const savedDish = await newDish.save();
  return savedDish;
};

const updateDish = async (
  dishId: string,
  name: string,
  price: number,
  image: string,
  ingredients: string,
  tags: string,
  restaurant: ObjectId,
  is_Active: boolean
) => {
  const updatedDish = await Dish.findByIdAndUpdate(
    dishId,
    { name, price, image, ingredients, tags, restaurant, is_Active },
    { new: true }
  );
  return updatedDish;
};

const removeDish = async (dishId: string) => {
  const deletedDish = await Dish.findByIdAndUpdate(dishId,
    { is_active: false },
    { new: true });
  return deletedDish;
};

export { findAllDishes, findDishById, addDish, updateDish, removeDish };
