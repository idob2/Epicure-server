import { ObjectId } from "mongodb";
import Chef from "../models/chef";
import { IRestaurant } from "../interfaces/IRestaurant";

const findAllChefs = async () => {
  const allChefs = await Chef.find({
    is_active: true
  });
  return allChefs;
};

const getAllChefsPopulated = async () => {
    const chefs = await Chef.find({ is_active: true })
      .populate("restaurants", "name"); 
    if(chefs.length === 0){
      return chefs;
    }
    const result = chefs.map((chef) => ({
      _id: chef._id,
      name: chef.name,
      image: chef.image,
      description: chef.description,
      restaurants: chef.restaurants.map(restaurant => restaurant._id),
      restaurants_names: chef.restaurants.length > 0
      ? (chef.restaurants as unknown as IRestaurant[]).map((restaurant) => restaurant.name)
      : []    }));
    return result;
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
    { $pull: { restaurants: restaurantId } }, 
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
    { $addToSet: { restaurants: restaurantId } }, 
    { new: true }
  );
  return updatedChef;
};

const removeRestaurantFromOtherChefs = async(restaurants: ObjectId[], chefId: string) =>{
   const existingChefsWithRestaurants = await Chef.find({ restaurants: { $in: restaurants } });

   for (const chef of existingChefsWithRestaurants) {
     if (chef._id.toString() !== chefId) {
       chef.restaurants = chef.restaurants.filter(
         (restId: any) => !restaurants.includes(restId.toString())
       );
       await chef.save();  
     }
   }
};
const updateChefReferences = async (restaurantId: string, newChefId: string, existingChefId: string) => {
      await Chef.findOneAndUpdate(
          { _id: existingChefId, is_active: true },
          { $pull: { restaurants: restaurantId } }
      );

      await Chef.findOneAndUpdate(
          { _id: newChefId, is_active: true },
          { $addToSet: { restaurants: restaurantId } }
      );
};



export {
  findAllChefs,
  findChefById,
  addChef,
  updateChef,
  removeChef,
  deleteRestaurantFromChef,
  addRestaurantToChef,
  findAllChefRestaurants,
  getAllChefsPopulated,
  removeRestaurantFromOtherChefs,
  updateChefReferences,
};
