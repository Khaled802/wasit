import passportJWT from 'passport-jwt';
import { UserObject } from '../models/user';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

export const JWT_SECRET = process.env.JWT_SECRET || 'SECRET-KEY135793';

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};


export const jwtStrategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  
  if ('id' in jwt_payload) {
    const user = jwt_payload;
    return done(null, user);
  } else {
    return done(null, false);
  }
});