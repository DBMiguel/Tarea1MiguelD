import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

// Listar todos los productos
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// Traer producto por ID
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(pid);
  res.json(product || { error: "Producto no encontrado" });
});

// Crear un nuevo producto
router.post("/", async (req, res) => {
  const newProduct = req.body;
  const added = await productManager.addProduct(newProduct);
  res.json(added);
});

// Actualizar producto por ID
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const update = req.body;
  const updated = await productManager.updateProduct(pid, update);
  res.json(updated);
});

// Eliminar producto por ID
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const deleted = await productManager.deleteProduct(pid);
  res.json(deleted);
});

export default router;
