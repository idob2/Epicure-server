import mongoose from "mongoose";
import bodyParser from 'body-parser';

const dbConnect = () =>{
mongoose.set("strictQuery", false)

mongoose
  .connect(
    "mongodb+srv://ido1403:g4Za8rkHHOpXKP0n@cluster0.iiwi5ht.mongodb.net/Epicure"
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
}

export default dbConnect;

