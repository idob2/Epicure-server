import { ObjectId } from "mongodb";
import Chef from "../models/chef";

const findAllChefs = async () => {
  const allChefs = await Chef.find({
    is_active: true
  });
  return allChefs;
};

const findChefById = async (chefId: string) => {
  const chef = await Chef.findById({ _id: chefId, is_active: true });
  return chef;
};

const findAllChefRestaurants = async (chefId: string) => {
    const chef = await Chef.findById({ _id: chefId, is_active: true }).populate("restaurants");
    return chef;
};

const addChef = async (
  name: string,
  image: string,
  description: string,
  restaurants: string[]
) => {
  const newChef = new Chef({
    name,
    image,
    description,
    restaurants,
    is_active: true
  });

  const savedChef = await newChef.save();
  return savedChef;
};

const updateChef = async (
  chefId: string,
  name: string,
  image: string,
  description: string,
  restaurants: string,
  is_active: boolean
) => {
  const updatedChef = await Chef.findByIdAndUpdate(
    chefId,
    { name, image, description, restaurants, is_active },
    { new: true }
  );
  return updatedChef;
};

const removeChef = async (chefId: string) => {
  const deletedChef = await Chef.findByIdAndUpdate(chefId,
    { is_active: false },
    { new: true });
  return deletedChef;
};

const deleteRestaurantFromChef = async (
  chefId: ObjectId,
  restaurantId: string
) => {
  const updatedChef = await Chef.findByIdAndUpdate(
    chefId,
    { $pull: { restaurants: restaurantId } }, // remove the restaurantId from the restaurants list
    { new: true }
  );
  return updatedChef;
};

const addRestaurantToChef = async (
  chefId: ObjectId,
  restaurantId: ObjectId
) => {
  const updatedChef = await Chef.findByIdAndUpdate(
    chefId,
    { $addToSet: { restaurants: restaurantId } }, // add the restaurantId from the restaurants list
    { new: true }
  );
  return updatedChef;
};
export {
  findAllChefs,
  findChefById,
  addChef,
  updateChef,
  removeChef,
  deleteRestaurantFromChef,
  addRestaurantToChef,
  findAllChefRestaurants
};
