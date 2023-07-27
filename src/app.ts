import express from 'express';
import cors from 'cors';
import dbConnect from './db/db_connect';
import bodyParser from 'body-parser';
import apiRouter from "./routes/api_router";

require('dotenv').config();

const app = express();
app.use(cors());

// Add middleware before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data in the request body

app.use("/api", apiRouter);

app.get('/', (req:any, res:any) => {
  res.send("This is the Epicure server");
});
 
app.listen(process.env.PORT || 3000, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});

dbConnect();