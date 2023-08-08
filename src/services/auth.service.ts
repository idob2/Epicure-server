import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: () => void) => {
  const autheHeader = req.header("Authorization");
  const token = autheHeader && autheHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_ACCESS_KEY as Secret);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
export { authMiddleware };
