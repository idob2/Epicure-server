import { ObjectId } from "mongodb";
import Dish from "../models/dish";
import { Types } from "mongoose";
import { IRestaurant } from "../interfaces/IRestaurant";

const findAllDishes = async () => {
  const allDishes = await Dish.find({
    is_active: true,
  });
  return allDishes;
};

const getAllDishesPopulated = async () => {
  // Get all dishes and populate the 'restaurant' field with only the 'name' attribute
  const dishes = await Dish.find({
    is_active: true,
  }).populate("restaurant", "name");

  // Transforming the result to match the format you provided
  const result = dishes.map((dish) => ({
    _id: dish._id,
    name: dish.name,
    image: dish.image,
    price: dish.price,
    ingredients: dish.ingredients,
    tags: dish.tags,
    restaurant: dish.restaurant._id,
    restaurant_name: (dish.restaurant as unknown as IRestaurant).name,
  }));
  return result;
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
    is_active: true,
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
  const deletedDish = await Dish.findByIdAndUpdate(
    dishId,
    { is_active: false },
  );
  return deletedDish;
};

const removeAllGivenDishes = async (dishes: ObjectId[]) => {
  await Dish.updateMany(
    { _id: { $in: dishes } },
    { is_active: false }
  );
};

const updateDishReferences = async (restaurantId: string, newDishes: string[], existingDishes: string[]) => {
  // Add the restaurant reference to new dishes that are active
  await Dish.updateMany(
      { _id: { $in: newDishes }, is_active: true },
      { $set: { restaurant: restaurantId } }
  );

  // Set `is_active` to false for the previous active dishes not in the new list
  await Dish.updateMany(
      { _id: { $nin: newDishes, $in: existingDishes }, is_active: true },
      { $set: { is_active: false } }
  );
};



export {
  findAllDishes,
  findDishById,
  addDish,
  updateDish,
  removeDish,
  getAllDishesPopulated,
  removeAllGivenDishes,
  updateDishReferences,
};

