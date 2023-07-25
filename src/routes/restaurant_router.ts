import express from "express";
import Restaurant from "../models/restaurant";

const router = express.Router();

// GET all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch restaurant." });
  }
});

// GET restaurant by ID
router.get("/id/:id", async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch the restaurant." });
  }
});

router.get("/name/:name", async (req, res) => {
  const restaurantName = req.params.name;

  try {
    const restaurant = await Restaurant.findOne({ name: restaurantName });
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }
    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch the restaurant." });
  }
});

// Create a new restaurant
router.post("/", async (req, res) => {
  const { name, image, chef, dishes } = req.body;
  console.log(req.body);
  try {
    const newRestaurant = new Restaurant({
      name,
      image,
      chef,
      dishes
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create a new restaurant." });
  }
});

// Update restaurant by ID
router.put("/:id", async (req, res) => {
  const restaurnatId = req.params.id;
  const { name, image, chef, dishes } = req.body;

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurnatId,
      { name, image, chef, dishes },
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the restaurant." });
  }
});

// Delete restaurant by ID
router.delete("/:id", async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found." });
    }

    res.json(deletedRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the restaurant." });
  }
});

export default router;
