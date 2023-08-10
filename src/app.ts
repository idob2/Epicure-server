import express from 'express';
import cors from 'cors';
import dbConnect from './db/db_connect';
import bodyParser from 'body-parser';
import apiRouter from "./routes/api_router";

require('dotenv').config();

const app = express();
const allowedOrigins = ['http://ec2-18-117-229-138.us-east-2.compute.amazonaws.com', 'http://18.117.229.138', 'http://ec2-3-137-173-135.us-east-2.compute.amazonaws.com', 'http://3.137.173.135', 'http://localhost:8080'];

app.use(cors({
  origin: allowedOrigins,
}));

// Add middleware before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data in the request body

app.use("/api", apiRouter);

app.get('/', (req:any, res:any) => {
  res.send("This is the Epicure server");
});
 
app.listen(process.env.PORT || 8080, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8080));
});

dbConnect();