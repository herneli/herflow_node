import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "../config";
import db from "../models";

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.secret;
opts.jsonWebTokenOptions = {
  clockTolerance: 100
};

passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("Strategy");
    db.User.findOne({ where: { email: jwt_payload.sub } })
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(reason => {
        return done(reason, false);
      });
  })
);

export default passport;
