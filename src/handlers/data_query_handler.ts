import Chef from "../models/chef";
import Dish from "../models/dish";
import Restaurant from "../models/restaurant";

const findDataByQuery = async (value: any) => {
  const [filteredChefs, filteredRestaurants, filteredDishes] =
    await Promise.all([
      Chef.find({ name: { $regex: value, $options: "i" } }),
      Restaurant.find({ name: { $regex: value, $options: "i" } }),
      Dish.find({ name: { $regex: value, $options: "i" } }),
    ]);

  return {
    chefs: filteredChefs,
    restaurants: filteredRestaurants,
    dishes: filteredDishes,
  };
};

export { findDataByQuery };
