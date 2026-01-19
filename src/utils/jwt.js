import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    "JWT_SECRET_KEY",
    { expiresIn: "1h" }
  );
};
