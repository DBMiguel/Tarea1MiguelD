import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import bcrypt from "bcrypt";
import UserManager from "../dao/managers/UserManager.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const userManager = new UserManager();

export const initializePassport = () => {

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await userManager.getUserByEmail(email);
          if (!user) return done(null, false);

          const validPassword = bcrypt.compareSync(password, user.password);
          if (!validPassword) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "JWT_SECRET_KEY"
      },
      async (payload, done) => {
        try {
          const user = await userManager.getUserById(payload.id);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
