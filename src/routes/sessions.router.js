import { Router } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import UserManager from "../dao/managers/UserManager.js";
import { generateToken } from "../utils/jwt.js";

const router = Router();
const userManager = new UserManager();

// Apartado de Registro
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  const exists = await userManager.getUserByEmail(email);
  if (exists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const user = await userManager.createUser({
    first_name,
    last_name,
    email,
    age,
    password: bcrypt.hashSync(password, 10),
    cart: null,
    role: "user"
  });

  res.status(201).json({ message: "User registered", user });
});

// Apartado de LOGIN
router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.json({ token });
  }
);

// Apartado de seccion actual
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

export default router;
