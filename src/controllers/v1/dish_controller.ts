import { Request, Response } from "express";
import {
  findAllDishes,
  findDishById,
  addDish,
  updateDish,
  removeDish,
} from "../../handlers/dish_handler";
import {
  addDishToRestaurant,
  deleteDishFromRestaurant,
} from "../../handlers/restaurant_handler";
import { Types } from "mongoose";

const getAllDishes = async (req: Request, res: Response) => {
  try {
    const dishes = await findAllDishes();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch dishes." });
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch the dish." });
  }
};

const postDish = async (req: Request, res: Response) => {
  const { name, price, image, ingredients, tags, restaurant } = req.body;
  console.log(req.body);
  try {
    const dishId = new Types.ObjectId();
    const newDish = await addDish(
      dishId,
      name,
      price,
      image,
      ingredients,
      tags,
      restaurant
    );

    const updatedRestaurant = await addDishToRestaurant(restaurant, dishId);
    if (!updatedRestaurant) {
      return res.status(404).json({
        error:
          "Restaurant not found or the dish was not linked to any restaurant.",
      });
    }

    res.json(newDish);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create a new dish." });
  }
};

const putDish = async (req: Request, res: Response) => {
  const dishId = req.params.id;
  const { name, price, image, ingredients, tags, restaurant } = req.body;
  try {
    const updatedDish = await updateDish(
      dishId,
      name,
      price,
      image,
      ingredients,
      tags,
      restaurant
    );
    if (!updatedDish) {
      return res.status(404).json({ error: "Dish not found." });
    }
    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the dish." });
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
    console.log(updatedRestaurant);
    if (!updatedRestaurant) {
      return res.status(404).json({
        error:
          "Restaurant not found or the dish was not linked to any restaurant.",
      });
    }

    res.json(deletedDish);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the dish." });
  }
};

export { getAllDishes, getDishById, postDish, putDish, deleteDish };
