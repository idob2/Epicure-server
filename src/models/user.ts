import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  token: { 
    type: String, 
    required: false 
},
  username: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
