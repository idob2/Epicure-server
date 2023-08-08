import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { findUser, addUser } from "../../handlers/user_handler";
import { getErrorMessage } from "../../utils/error.utils";

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await findUser(username);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = password === user.password;
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
        { username: user.username, password: user.password },
        process.env.PRIVATE_ACCESS_KEY as Secret,
        { expiresIn: "1h" }
      );
  

    // const savedUser = await addUser(username, password, token);

    console.log(token);
    res.status(200).json({ accessToken: token });
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

export { loginUser };
