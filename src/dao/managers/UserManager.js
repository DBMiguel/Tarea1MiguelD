import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateId } from "../../utils/generateId.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFile = path.join(__dirname, "../../data/users.json");

export default class UserManager {
  constructor() {
    if (!fs.existsSync(usersFile)) {
      fs.writeFileSync(usersFile, JSON.stringify([]));
    }
  }

  async getUsers() {
    return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  }

  async getUserByEmail(email) {
    const users = await this.getUsers();
    return users.find(u => u.email === email);
  }

  async getUserById(id) {
    const users = await this.getUsers();
    return users.find(u => u.id === id);
  }

  async createUser(user) {
    const users = await this.getUsers();
    user.id = generateId();
    users.push(user);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    return user;
  }
}
