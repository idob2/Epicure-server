import { Request, Response } from "express";
import {
  findAllDishes,
  findDishById,
  addDish,
  updateDish,
  removeDish,
  getAllDishesPopulated
} from "../../handlers/dish_handler";
import {
  addDishToRestaurant,
  deleteDishFromRestaurant,
  removeDishFromOtherRestaurants,
} from "../../handlers/restaurant_handler";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";

const getAllDishes = async (req: Request, res: Response) => {
  try {
    const dishes = await findAllDishes();
    res.json(dishes);
  } catch (error: any) {
    res.status(500).json({ error:error.message });
  }
};

const getAllDishesPopulate = async (req: Request, res: Response) => {
  try {
    const dishes = await getAllDishesPopulated();
    res.json(dishes);
  } catch (error: any) {
    res.status(500).json({ error:error.message });
  }
};

const getDishById = async (req: Request, res: Response) => {
  const dishId = req.params.id;
  try {
    const dish = await findDishById(dishId);
    if (!dish) {
      return res.status(404).json({ error: "Dish not found." });
    }
    res.json(dish);
  } catch (error: any) {
    res.status(500).json({ error: error.message});
  }
};

const postDish = async (req: Request, res: Response) => {
  const { name, price, image, ingredients, tags, restaurant } = req.body;
  try {
    const dishId = new ObjectId();
    const newDish = await addDish(
      dishId,
      name,
      price,
      image,
      ingredients,
      tags,
      restaurant,
    );
    const updatedRestaurant = await addDishToRestaurant(restaurant, dishId);
    if (!updatedRestaurant) {
      return res.status(404).json({
        error:
          "Restaurant not found or the dish was not linked to any restaurant.",
      });
    }

    res.json(newDish);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const putDish = async (req: Request, res: Response) => {
  const dishId = req.params.id;
  const { name, price, image, ingredients, tags, restaurant, is_active } = req.body;
  try {
    const updatedDish = await updateDish(
      dishId,
      name,
      price,
      image,
      ingredients,
      tags,
      restaurant,
      is_active
    );

    // If the dish has an associated restaurant, ensure it's updated and removed from other restaurants
    if (restaurant) {
        await removeDishFromOtherRestaurants(dishId, restaurant);
        await addDishToRestaurant(new ObjectId(restaurant), new ObjectId(dishId));
    }

    if (!updatedDish) {
      return res.status(404).json({ error: "Dish not found." });
    }
    res.json(updatedDish);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


const deleteDish = async (req: Request, res: Response) => {
  const dishId = req.params.id;
  try {
    const deletedDish = await removeDish(dishId);
    if (!deletedDish) {
      return res.status(404).json({ error: "Dish not found." });
    }
    const restaurantId = deletedDish.restaurant;
    const updatedRestaurant = await deleteDishFromRestaurant(
      restaurantId,
      dishId
    );
    if (!updatedRestaurant) {
      return res.status(404).json({
        error:
          "Restaurant not found or the dish was not linked to any restaurant.",
      });
    }

    res.json(deletedDish);
  } catch (error: any) {
    res.status(500).json({ error: error.log});
  }
};

export { getAllDishes, getDishById, postDish, putDish, deleteDish, getAllDishesPopulate, };
