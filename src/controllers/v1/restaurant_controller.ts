import { Request, Response } from "express";
import {
  findAllRestaurants,
  findRestaurantsById,
  addRestaurant,
  updateRestaurant,
  removeRestaurant,
  findChefOfRestaurant,
} from "../../handlers/restaurant_handler";
import {
  deleteRestaurantFromChef,
  addRestaurantToChef,
} from "../../handlers/chef_handler";
import { Types } from "mongoose"; // Import Types from Mongoose

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
    console.log(error);
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch the restaurant." });
  }
};

const postRestaurant = async (req: Request, res: Response) => {
  const { name, image, chef, dishes } = req.body;
  console.log(req.body);
  try {
    const restaurantId = new Types.ObjectId();
    const newRestaurant = await addRestaurant(
      restaurantId,
      name,
      image,
      chef,
      dishes
    );

    const updatedChef = await addRestaurantToChef(chef, restaurantId);
    if (!updatedChef) {
      return res.status(404).json({
        error: "Chef not found or the restaurant was not linked to any chef.",
      });
    }

    res.json(newRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create a new restaurant." });
  }
};

const putRestaurant = async (req: Request, res: Response) => {
  const restaurnatId = req.params.id;
  const { name, image, chef, dishes } = req.body;
  try {
    const updatedRestaurant = await updateRestaurant(
      restaurnatId,
      name,
      image,
      chef,
      dishes
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the restaurant." });
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
    console.log(updatedChef);
    if (!updatedChef) {
      return res.status(404).json({
        error: "Chef not found or the restaurant was not linked to any chef.",
      });
    }

    res.json(deletedRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the restaurant." });
  }
};

export {
  getAllRestaurants,
  getRestaurantByID,
  postRestaurant,
  putRestaurant,
  deleteRestaurant,
  getRestaurantChefByID,
};
