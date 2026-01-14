import fs from "fs/promises";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const id = products.length + 1;
    const newProduct = { id, status: true, thumbnails: [], ...product };
    products.push(newProduct);
    await this.saveProducts(products);
    return newProduct;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id == id);
  }

  async updateProduct(id, update) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id == id);
    if (index === -1) return { error: "Producto no encontrado" };
    products[index] = { ...products[index], ...update, id: products[index].id };
    await this.saveProducts(products);
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id == id);
    if (index === -1) return { error: "Producto no encontrado" };
    const deleted = products.splice(index, 1);
    await this.saveProducts(products);
    return deleted[0];
  }
}
