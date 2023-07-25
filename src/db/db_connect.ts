import mongoose from "mongoose";
import bodyParser from 'body-parser';

const dbConnect = () =>{
mongoose.set("strictQuery", false)

mongoose
  .connect(
    `mongodb+srv://${process.env['DATABASE_NAME']}:${process.env['DATABASE_PASSWORD']}@cluster0.iiwi5ht.mongodb.net/Epicure`
  )

  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
}

export default dbConnect;

