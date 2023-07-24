import express from 'express';
import mongoose from 'mongoose';
import dbConnect from './db/db_connect';
import bodyParser from 'body-parser';
import chefRouter from "./routes/chef_router";
import RestaurantRouter from './routes/restaurant_router';

const app = express();
const router = express.Router();

// Add middleware before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data in the request body
app.use("/api/chefs", chefRouter);
app.use("/api/restaurants", RestaurantRouter);



app.get('/', (req:any, res:any) => {
  res.send("This is the Epicure server");
});
 
app.listen(process.env.PORT || 3000, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});

dbConnect();