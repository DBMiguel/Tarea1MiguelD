import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import UserManager from "../managers/UserManager.js";

export const JWT_SECRET = "clave_super_secreta";


export const initializePassport = () => {

  
  passport.use("login", new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      const valid = UserManager.validateUser(email, password);
      if (!valid) return done(null, false, { message: "Usuario o contraseña incorrectos" });
      const user = UserManager.getUserByEmail(email);
      return done(null, user);
    }
  ));

  
  passport.use("jwt", new JWTStrategy(
    { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
    (payload, done) => {
      const user = UserManager.getCurrentUser(payload.email);
      if (!user) return done(null, false);
      return done(null, user);
    }
  ));
};

export default passport;
