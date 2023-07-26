import { Request, Response } from "express";
import {
  findAllChefs,
  findChefById,
  addChef,
  updateChef,
  removeChef,
  findAllChefDishes,
  findAllChefRestaurants,
  
} from "../../handlers/chef_handler";

const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await findAllChefs();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch chefs." });
  }
};

// const queryChef = async  (req: Request, res: Response) => {
//   console.log("here");
//   try {
//     const value = req.query.value;
//     console.log(value);
//     const chefs = await findChefByQuery(value);
//     res.json(chefs);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Unable to fetch chefs." });
//   }
// }
const getChefByID = async (req: Request, res: Response) => {
  const chefId = req.params.id;
  try {
    const chef = await findChefById(chefId);
    if (!chef) {
      return res.status(404).json({ error: "Chef not found." });
    }
    res.json(chef);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch the chef." });
  }
};

const getAllDishesOfChef = async (req: Request, res: Response) => {
  const chefId = req.params.id;
  try {
    const chef = await findAllChefDishes(chefId);
    if (!chef) {
      res.status(404).json({ error: "Unable to fetch chef" });
    }
    const allDishes: any[] = [];
    chef?.restaurants.forEach((restaurant: any) => {
      allDishes.push(...restaurant.dishes);
    });
    res.json(allDishes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch chef or populate dishes." });
  }
};

const getChefRestaurants = async (req: Request, res: Response) => {
  const chefId = req.params.id;
  try {
    const chef = await findAllChefRestaurants(chefId);
    if (!chef) {
      return res.status(404).json({ error: "Chef not found." });
    }

    res.json(chef.restaurants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch the chef." });
  }
};


const postChef = async (req: Request, res: Response) => {
  const { name, image, description, restaurants } = req.body;
  console.log(req.body);
  try {
    const newChef = await addChef(name, image, description, restaurants);
    res.json(newChef);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create a new chef." });
  }
};

const putChef = async (req: Request, res: Response) => {
  const chefId = req.params.id;
  const { name, image, description, restaurants } = req.body;
  try {
    const updatedChef = await updateChef(
      chefId,
      name,
      image,
      description,
      restaurants
    );
    if (!updatedChef) {
      return res.status(404).json({ error: "Chef not found." });
    }
    res.json(updatedChef);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the chef." });
  }
};

const deleteChef = async (req: Request, res: Response) => {
  const chefId = req.params.id;
  try {
    const deletedChef = await removeChef(chefId);

    if (!deletedChef) {
      return res.status(404).json({ error: "Chef not found." });
    }
    res.json(deletedChef);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the chef." });
  }
};

export { getAllChefs, getChefByID, postChef, putChef, deleteChef, getAllDishesOfChef, getChefRestaurants, };
