const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/UserModel');
const profModel = require('../models/profModel');

// Hardcoded Google OAuth credentials

passport.use(new GoogleStrategy({
    clientID: process.env.Client_id,
    clientSecret:process.env.Client_secert,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
 
      try {
        let user = await userModel.findOne({ email: profile.emails[0].value });
        let prof = await profModel.findOne({ email: profile.emails[0].value });
    
        if (!user && !prof) {
            return done(new Error("Email not connected or not found in database"), null);
        }
    
        return done(null, user || prof);
    } catch (err) {
        return done(err, null);
    }
    }
  
));

module.exports = passport;