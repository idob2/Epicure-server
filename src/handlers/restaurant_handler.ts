import { Types } from "mongoose";
import Restaurant from "../models/restaurant";
import { ObjectId } from "mongodb";

const findAllRestaurants = async () => {
  const allRestaurants = await Restaurant.find({
    is_active: true,
  });
  return allRestaurants;
};

const findRestaurantsById = async (restaurantId: string) => {
  const restaurant = await Restaurant.findOne({ _id: restaurantId, is_active: true });
  return restaurant;
};

const addRestaurant = async (
  restaurantId: ObjectId,
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
    is_active: true
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
) => {
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    restaurnatId,
    { name, image, chef, dishes, is_active },
    { new: true }
  );

  return updatedRestaurant;
};

const removeRestaurant = async (restaurantId: string) => {
  const deletedRestaurant = await Restaurant.findByIdAndUpdate(
    restaurantId,
    { is_active: false },
    { new: true }
  );  return deletedRestaurant;
};

const findChefOfRestaurant = async (restaurantId: string) => {
  const restaurant = await Restaurant.findById(restaurantId).populate("chef");
  return restaurant;
};

const findAllRestaurantDishes = async (restauratnId: string) => {
    const restaurant = await Restaurant.aggregate([
        {$match: {_id: new ObjectId(restauratnId)}},
        {
            $lookup: {
                from: 'dishes',
                localField: 'dishes',
                foreignField: '_id',
                as: 'dishes'
            },
        },
    ]);

    return restaurant[0];
   
}
const deleteDishFromRestaurant = async (
  restaurantId: ObjectId,
  dishId: string
) => {
  const updatedRestaurant = await Restaurant.findOneAndUpdate(
    restaurantId,
    { $pull: { dishes: dishId } },
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
    { $addToSet: { dishes: dishId } }, // add the dishId from the dishes list
    { new: true }
  );
  return updatedRestaurant;
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
};
