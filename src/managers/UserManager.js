import User from "../models/User.js";
import bcrypt from "bcrypt";

class UserManager {
  constructor() {
    this.users = [];
  }

  createUser({ first_name, last_name, email, age, password, cart = [], role = "user" }) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ first_name, last_name, email, age, password: hashedPassword, cart, role });
    this.users.push(user);
    return user;
  }

  getUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  validateUser(email, password) {
    const user = this.getUserByEmail(email);
    if (!user) return false;
    return bcrypt.compareSync(password, user.password);
  }

  getCurrentUser(email) {
    return this.getUserByEmail(email);
  }
}


const userManagerInstance = new UserManager();
export default userManagerInstance;
