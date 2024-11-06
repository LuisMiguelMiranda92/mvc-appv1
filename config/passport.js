const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    async function authenticateUser(email, password) {
        try {
          const user = await User.findOne({ email: email.toLowerCase() });
      
          if (!user) {
            throw new Error(`Email ${email} not found.`);
          }
      
          if (!user.password) {
            throw new Error('Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.');   
      
          }
      
          const isMatch = await user.comparePassword(password);
      
          if (!isMatch)   
       {
            return done(null, false, { msg: 'Invalid email or password.' })
          }
      
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
      authenticateUser(email, password)

  }))
  

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});
}