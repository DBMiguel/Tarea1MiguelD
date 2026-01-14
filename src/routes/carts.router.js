import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager("./src/data/carts.json");

// Listar todos los carritos
router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.json(carts);
});

// Listar productos de un carrito por ID
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  res.json(cart || { error: "Carrito no encontrado" });
});

// Crear un carrito
router.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.json(newCart);
});

// Agregar producto a carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const updatedCart = await cartManager.addProductToCart(cid, pid);
  res.json(updatedCart);
});

export default router;
