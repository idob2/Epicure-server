import { Types } from "mongoose";
import Restaurant from "../models/restaurant";
import { ObjectId } from "mongodb";
import Chef from "../models/chef";
import { IChef } from "../interfaces/IChef";
import { IDish } from "../interfaces/IDish";
import { removeAllGivenDishes } from "./dish_handler";

const findAllRestaurants = async () => {
  const allRestaurants = await Restaurant.find({
    is_active: true,
  });
  return allRestaurants;
};

const getAllRestaurantsPopulated = async () => {
  const restaurants = await Restaurant.find({ is_active: true })
    .populate("chef", "name") 
    .populate("dishes", "name"); 
  const result = restaurants.map((restaurant) => ({
    _id: restaurant._id,
    name: restaurant.name,
    image: restaurant.image,
    chef: restaurant.chef._id,
    chef_name: (restaurant.chef as unknown as IChef).name,
    dishes: restaurant.dishes.map((dish) => dish._id),
    dishes_names: (restaurant.dishes as unknown as IDish[]).map(
      (dish) => dish.name
    ),
    ranking: restaurant.ranking,
  }));
  return result;
};

const updateRestaurants = async (restaurants: object[], chefId: string) => {
  await Restaurant.updateMany(
    { _id: { $in: restaurants }, is_active: true },
    { chef: chefId }
  );
};

const deleteAllGivenRestaurants = async (restaurants: object[]) => {
  const affectedRestaurants = await Restaurant.find({
    _id: { $in: restaurants },
    is_active: true,
  }).select("dishes");

  const allDishes = affectedRestaurants.flatMap((restaurant) => restaurant.dishes);
  await removeAllGivenDishes(allDishes);

  if (restaurants) {
    for (const restaurantId of restaurants) {
      const restaurant = await Restaurant.findById(restaurantId);
      if (restaurant) {
        restaurant.dishes = [];
        restaurant.markModified('dishes'); // Marking dishes as modified
        restaurant.is_active = false;
        await restaurant.save();
      }
    }
  }
};

const findRestaurantsById = async (restaurantId: string) => {
  const restaurant = await Restaurant.findOne({
    _id: restaurantId,
    is_active: true,
  });
  return restaurant;
};

const addRestaurant = async (
  restaurantId: ObjectId,
  name: string,
  image: string,
  chef: string,
  dishes: string[],
  ranking: String
) => {
  const newRestaurant = new Restaurant({
    _id: restaurantId,
    name,
    image,
    chef,
    dishes,
    is_active: true,
    ranking,
  });
  const savedRestaurant = await newRestaurant.save();
  return savedRestaurant;
};

const updateRestaurant = async (
  restaurnatId: string,
  name: string,
  image: string,
  chef: string,
  dishes: string[],
  is_active: boolean,
  ranking: string
) => {
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    restaurnatId,
    { name, image, chef, dishes, is_active, ranking },
    { new: true }
  );

  return updatedRestaurant;
};

const removeRestaurant = async (restaurantId: string) => {
  const restaurants = [new ObjectId(restaurantId)];
  await deleteAllGivenRestaurants(restaurants);
  const newRestaurant = await findRestaurantsById(restaurantId);
  return newRestaurant;
  // const restaurant = await Restaurant.findById(restaurantId);
  // if (restaurant) {
  //   restaurant.is_active = false;
  //   console.log("here");
  //   await restaurant.save();
  //   return restaurant;
  // }
};

const findChefOfRestaurant = async (restaurantId: string) => {
  const restaurant = await Restaurant.findById(restaurantId).populate("chef");
  return restaurant;
};

const findAllRestaurantDishes = async (restauratnId: string) => {
  const restaurant = await Restaurant.aggregate([
    { $match: { _id: new ObjectId(restauratnId) } },
    {
      $lookup: {
        from: "dishes",
        localField: "dishes",
        foreignField: "_id",
        as: "dishes",
      },
    },
  ]);

  return restaurant[0];
};
const deleteDishFromRestaurant = async (
  restaurantId: ObjectId,
  dishId: string
) => {
  const updatedRestaurant = await Restaurant.findOneAndUpdate(
    restaurantId,
    { $pull: { dishes: dishId }, is_active: true },
    { new: true }
  );
  return updatedRestaurant;
};

const addDishToRestaurant = async (
  restaurantId: ObjectId,
  dishId: ObjectId
) => {
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    restaurantId,
    { $addToSet: { dishes: dishId }, is_active: true }, 
    { new: true }
  );
  return updatedRestaurant;
};

const deactivatePreviousRestaurants = async (
  existingRestaurants: ObjectId[],
  newRestaurants: ObjectId[]
) => {
  const restaurantsToDeactivate = existingRestaurants.filter(
    (restId: any) => !newRestaurants.includes(restId.toString())
  );

  await Restaurant.updateMany(
    { _id: { $in: restaurantsToDeactivate }, is_active: true },
    { is_active: false }
  );
};

const removeDishFromOtherRestaurants = async (
  dishId: string,
  currentRestaurantId: string
) => {
  await Restaurant.updateMany(
    { _id: { $ne: currentRestaurantId }, is_active: true, dishes: dishId },
    { $pull: { dishes: dishId } }
  );
};

const removeNewDishesFromOtherRestaurants = async (
  dishes: string[],
  currentRestaurantId: string
) => {
  await Restaurant.updateMany(
    {
      _id: { $ne: currentRestaurantId },
      dishes: { $in: dishes },
      is_active: true,
    },
    { $pullAll: { dishes: dishes } }
  );
};

export {
  findAllRestaurants,
  findRestaurantsById,
  addRestaurant,
  updateRestaurant,
  removeRestaurant,
  findChefOfRestaurant,
  deleteDishFromRestaurant,
  addDishToRestaurant,
  findAllRestaurantDishes,
  getAllRestaurantsPopulated,
  updateRestaurants,
  deleteAllGivenRestaurants,
  deactivatePreviousRestaurants,
  removeDishFromOtherRestaurants,
  removeNewDishesFromOtherRestaurants,
};
