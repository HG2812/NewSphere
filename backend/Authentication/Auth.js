const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new LocalStrategy(async (userName, password, done) => {
    //authentication logic here
    try {
      //verification function
      // console.log('Received Credentials:',userName,password);
      const user = await User.findOne({ username: userName });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
