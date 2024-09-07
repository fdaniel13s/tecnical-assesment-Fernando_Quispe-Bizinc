const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import and initialize models
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Post = require('./post')(sequelize, Sequelize.DataTypes);
const Comment = require('./comment')(sequelize, Sequelize.DataTypes);
const Task = require('./task')(sequelize, Sequelize.DataTypes);

// Create a db object to hold all models and Sequelize instances
const db = {
    User,
    Post,
    Comment,
    Task,
    sequelize,
    Sequelize,
};

// Set up associations for each model if they exist
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Export the db object for use in other parts of the application
module.exports = db;