const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    // Define the User model
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Username must be unique
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Email must be unique
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, // Password is required
        },
    }, {
        tableName: 'users' // Ensure the table name is correct
    });

    // Define associations for the User model
    User.associate = (models) => {
        User.hasMany(models.Post, { foreignKey: 'userId' }); // User has many Posts
        User.hasMany(models.Comment, { foreignKey: 'userId' }); // User has many Comments
    };

    // Add a method to verify the password
    User.prototype.verifyPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    return User;
};