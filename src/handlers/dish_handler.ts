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
  const dishes = await Dish.find({
    is_active: true,
  }).populate("restaurant", "name");
  if(dishes.length === 0){
    return dishes;
  }
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
  if(dishes){
    dishes.forEach(async (dishId) => {
      const dish = await findDishById(dishId.toString());
      if (dish) {
        dish.is_active = false;
        await dish.save();
      }
    });
  }
};

const updateDishReferences = async (restaurantId: string, newDishes: string[], existingDishes: string[]) => {
  await Dish.updateMany(
      { _id: { $in: newDishes }, is_active: true },
      { $set: { restaurant: restaurantId } }
  );

  await Dish.updateMany(
      { _id: { $nin: newDishes, $in: existingDishes }, is_active: true },
      { $set: { is_active: false } }
  );
};
const assignDishesToRestaurant = async (restaurantId: string, newDishes: string[]) => {
  await Dish.updateMany(
      { _id: { $in: newDishes }, is_active: true },
      { $set: { restaurant: restaurantId } }
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
  assignDishesToRestaurant
};

