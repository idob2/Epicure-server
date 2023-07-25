import express from "express";
import Chef from "../models/chef";

const router = express.Router();

// GET all chefs
router.get("/", async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch chefs." });
  }
});

// GET chef by ID
router.get("/id/:id", async (req, res) => {
  const chefId = req.params.id;

  try {
    const chef = await Chef.findById(chefId);
    if (!chef) {
      return res.status(404).json({ error: "Chef not found." });
    }
    res.json(chef);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch the chef." });
  }
});

router.get("/name/:name", async (req, res) => {
  const chefName = req.params.name;

  try {
    const chef = await Chef.findOne({ name: chefName });
    if (!chef) {
      return res.status(404).json({ error: "Chef not found." });
    }
    res.json(chef);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch the chef." });
  }
});

// Create a new chef
router.post("/", async (req, res) => {
  const { name, image, description, restaurants } = req.body;
  console.log(req.body);
  try {
    const newChef = new Chef({
      name,
      image,
      description,
      restaurants,
    });

    const savedChef = await newChef.save();
    res.status(201).json(savedChef);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create a new chef." });
  }
});

// Update chef by ID
router.put("/:id", async (req, res) => {
  const chefId = req.params.id;
  const { name, image, description, restaurants } = req.body;

  try {
    const updatedChef = await Chef.findByIdAndUpdate(
      chefId,
      { name, image, description, restaurants },
      { new: true }
    );

    if (!updatedChef) {
      return res.status(404).json({ error: "Chef not found." });
    }

    res.json(updatedChef);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the chef." });
  }
});

// Delete chef by ID
router.delete("/:id", async (req, res) => {
  const chefId = req.params.id;

  try {
    const deletedChef = await Chef.findByIdAndDelete(chefId);

    if (!deletedChef) {
      return res.status(404).json({ error: "Chef not found." });
    }

    res.json(deletedChef);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the chef." });
  }
});

export default router;
