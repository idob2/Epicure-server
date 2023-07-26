import { Types } from "mongoose";
import Restaurant from "../models/restaurant";

const findAllRestaurants = async () => {
  const allRestaurants = await Restaurant.find();
  return allRestaurants;
};

const findRestaurantsById = async (restaurantId: string) => {
  const restaurant = await Restaurant.findById(restaurantId);
  return restaurant;
};

const addRestaurant = async (
  restaurantId: Types.ObjectId,
  name: string,
  image: string,
  chef: string,
  dishes: string[]
) => {
  const newRestaurant = new Restaurant({
    _id: restaurantId,
    name,
    image,
    chef,
    dishes,
  });
  const savedRestaurant = await newRestaurant.save();
  return savedRestaurant;
};

const updateRestaurant = async (
  restaurnatId: string,
  name: string,
  image: string,
  chef: string,
  dishes: string[]
) => {
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    restaurnatId,
    { name, image, chef, dishes },
    { new: true }
  );

  return updatedRestaurant;
};

const removeRestaurant = async (restaurantId: string) => {
  const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
  return deletedRestaurant;
};

const findChefOfRestaurant = async (restaurantId: string) => {
  const restaurant = await Restaurant.findById(restaurantId).populate("chef");
  return restaurant;
};

export {
  findAllRestaurants,
  findRestaurantsById,
  addRestaurant,
  updateRestaurant,
  removeRestaurant,
  findChefOfRestaurant,
};
