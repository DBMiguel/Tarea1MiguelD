import express from "express";
import passport from "passport";
import { initializePassport } from "./config/passport.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.router.js";

const app = express();

// Middlewares
app.use(express.json());

// Passport
initializePassport();
app.use(passport.initialize());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

export default app;
