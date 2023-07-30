import { Request, Response } from "express";
import {
  findAllRestaurants,
  findRestaurantsById,
  addRestaurant,
  updateRestaurant,
  removeRestaurant,
  findChefOfRestaurant,
  findAllRestaurantDishes,
  deleteDishFromRestaurant,
} from "../../handlers/restaurant_handler";
import {
  deleteRestaurantFromChef,
  addRestaurantToChef,
} from "../../handlers/chef_handler";
import { removeDish } from "../../handlers/dish_handler";
import { ObjectId } from "mongodb";

const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await findAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch restaurant." });
  }
};

const getRestaurantByID = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  try {
    const restaurant = await findRestaurantsById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the restaurant." });
  }
};

const getRestaurantChefByID = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  try {
    const restaurant = await findChefOfRestaurant(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    const chefOfRestaurant = restaurant.chef;

    if (!chefOfRestaurant) {
      return res.status(404).json({ error: "Restaurant does not has chef." });
    }

    res.json(chefOfRestaurant);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const postRestaurant = async (req: Request, res: Response) => {
  const { name, image, chef, dishes, ranking } = req.body;
  try {
    const restaurantId = new ObjectId();
    const newRestaurant = await addRestaurant(
      restaurantId,
      name,
      image,
      chef,
      dishes,
      ranking
    );

    const updatedChef = await addRestaurantToChef(chef, restaurantId);
    if (!updatedChef) {
      return res.status(404).json({
        error: "Chef not found or the restaurant was not linked to any chef.",
      });
    }

    res.json(newRestaurant);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const putRestaurant = async (req: Request, res: Response) => {
  const restaurnatId = req.params.id;
  const { name, image, chef, dishes, is_active, ranking } = req.body;

  try {
    const updatedRestaurant = await updateRestaurant(
      restaurnatId,
      name,
      image,
      chef,
      dishes,
      is_active,
      ranking
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    res.json(updatedRestaurant);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  try {
    const deletedRestaurant = await removeRestaurant(restaurantId);
    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    const chefId = deletedRestaurant.chef;
    const updatedChef = await deleteRestaurantFromChef(chefId, restaurantId);
    if (!updatedChef) {
      return res.status(404).json({
        error: "Chef not found or the restaurant was not linked to any chef.",
      });
    }
    const restaurantDishes = deletedRestaurant.dishes;
    restaurantDishes.forEach(async (dish) => {
      await removeDish(String(dish._id));
      await deleteDishFromRestaurant(
        new ObjectId(restaurantId),
        String(dish._id)
      );
    });

    res.json(deletedRestaurant);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getDishesOfRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  try {
    const restaurant = await findAllRestaurantDishes(restaurantId);
    res.json(restaurant);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export {
  getAllRestaurants,
  getRestaurantByID,
  postRestaurant,
  putRestaurant,
  deleteRestaurant,
  getRestaurantChefByID,
  getDishesOfRestaurant,
};
