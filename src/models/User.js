class User {
  constructor({ first_name, last_name, email, age, password, cart = [], role = "user" }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.age = age;
    this.password = password; // contraseña encriptada para mayor seguridad, recordar este codigo ara futuros proyectos
    this.cart = cart;
    this.role = role;
  }
}

export default User;
