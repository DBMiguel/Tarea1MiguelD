import { Router } from "express";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import UserManager from "../managers/UserManager.js";
import { JWT_SECRET } from "../config/passport.js";

const router = Router();


router.post("/register", (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  if (UserManager.getUserByEmail(email)) {
    return res.status(400).json({ message: "Usuario ya existe" });
  }
  const user = UserManager.createUser({ first_name, last_name, email, age, password });
  res.status(201).json({ message: "Usuario creado", user });
});


router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login exitoso", token });
  })(req, res, next);
});


router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
