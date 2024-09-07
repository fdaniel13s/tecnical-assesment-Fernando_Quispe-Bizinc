const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models/db'); // Ensure the path is correct

// Configure the local strategy for Passport
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find the user by username
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // Compare the provided password with the stored hash
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            // If the password matches, return the user
            return done(null, user);
        } catch (err) {
            // Handle any errors that occur during the process
            return done(err);
        }
    }
));

// Serialize the user ID to store in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the user by ID to retrieve the user object
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;