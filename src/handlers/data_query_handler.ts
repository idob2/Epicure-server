import Chef from "../models/chef";
import Dish from "../models/dish";
import Restaurant from "../models/restaurant";

const findDataByQuery = async (value: any) => {
  const filteredChefs = await Chef.find({
    name: { $regex: value, $options: "i" },
  });
  const filteredRestaurants = await Restaurant.find({
    name: { $regex: value, $options: "i" },
  });
  const filteredDishes = await Dish.find({
    name: { $regex: value, $options: "i" },
  });
  return [filteredChefs, filteredRestaurants, filteredDishes];
};

export { findDataByQuery };
