import User from "../models/user";

const findUser = async (userName: string) => {
  const user = await User.findOne({ username: userName });
  return user;
};

const addUser = async (userName: string, password: string, token: any) => {
  const newUser = new User({
    userName,
    password,
    token,
  });


  const savedUser = await User.findOneAndUpdate(
    { userName: userName }, 
    { $set: { token: token} }, 
    { new: true } 
  );
  return savedUser;
};

export { findUser, addUser };
