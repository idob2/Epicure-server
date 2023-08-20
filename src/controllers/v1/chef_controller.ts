import { Request, Response } from "express";
import {
  findAllChefs,
  findChefById,
  addChef,
  updateChef,
  removeChef,
  findAllChefRestaurants,
  getAllChefsPopulated,
  removeRestaurantFromOtherChefs,
  
} from "../../handlers/chef_handler";
import { deactivatePreviousRestaurants, deleteAllGivenRestaurants, updateRestaurants } from "../../handlers/restaurant_handler";

const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await findAllChefs();
    res.json(chefs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRestaurantsPopulat = async (req: Request, res: Response) => {
  try {
    
    const chefs = await getAllChefsPopulated();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch chefs." });
  }
};

const getChefByID = async (req: Request, res: Response) => {
  const chefId = req.params.id;
  try {
    const chef = await findChefById(chefId);
    if (!chef) {
      return res.status(404).json({ error: "Chef not found." });
    }
    res.json(chef);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


const postChef = async (req: Request, res: Response) => {
  const { name, image, description, restaurants } = req.body;
  try {
    const newChef = await addChef(name, image, description, restaurants);
    const chefId = newChef._id.toString();
    await removeRestaurantFromOtherChefs(restaurants,chefId);
    await updateRestaurants(restaurants, chefId);
    res.json(newChef);
  } catch (error: any) {
    res.status(500).json({ error: error.message});
  }
};

const putChef = async (req: Request, res: Response) => {
  const chefId = req.params.id;
  const { name, image, description, restaurants, is_active } = req.body;
  try {
    const existingChef = await findChefById(chefId);
    if (!existingChef) {
      return res.status(404).json({ error: "Chef not found." });
    }
    const existingRestaurants = existingChef.restaurants;
    await removeRestaurantFromOtherChefs(restaurants,chefId);
    await deactivatePreviousRestaurants(existingRestaurants, restaurants);
    await updateRestaurants(restaurants, chefId);
    const updatedChef = await updateChef(
      chefId,
      name,
      image,
      description,
      restaurants,
      is_active
    );
    if (!updatedChef) {
      return res.status(404).json({ error: "Chef not found." });
    }
    res.json(updatedChef);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteChef = async (req: Request, res: Response) => {
  const chefId = req.params.id;
  try {
    const chef = await findChefById(chefId);
    const restaurants = chef?.restaurants;
    if(restaurants){
      await deleteAllGivenRestaurants(restaurants);
    }
    const deletedChef = await removeChef(chefId);

    if (!deletedChef) {
      return res.status(404).json({ error: "Chef not found." });
    }
    res.json(deletedChef);
  } catch (error: any) {
     res.status(500).json({ error: error.message });
  }
};

export { getAllChefs, getChefByID, postChef, putChef, deleteChef, getChefRestaurants, getAllRestaurantsPopulat,};
