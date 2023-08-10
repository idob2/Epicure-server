import { Request, Response } from "express";
import {
  findAllChefs,
  findChefById,
  addChef,
  updateChef,
  removeChef,
  findAllChefRestaurants,
  
} from "../../handlers/chef_handler";

const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await findAllChefs();
    res.json(chefs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
    res.json(newChef);
  } catch (error: any) {
    res.status(500).json({ error: error.message});
  }
};

const putChef = async (req: Request, res: Response) => {
  const chefId = req.params.id;
  const { name, image, description, restaurants, is_active } = req.body;
  try {
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
    const deletedChef = await removeChef(chefId);

    if (!deletedChef) {
      return res.status(404).json({ error: "Chef not found." });
    }
    res.json(deletedChef);
  } catch (error: any) {
     res.status(500).json({ error: error.message });
  }
};

export { getAllChefs, getChefByID, postChef, putChef, deleteChef, getChefRestaurants, };
