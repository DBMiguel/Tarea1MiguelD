import express from "express";
import passport from "passport";
import { initializePassport } from "./config/passport.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.router.js";

const app = express();


app.use(express.json());


initializePassport();
app.use(passport.initialize());


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);



app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

export default app;
