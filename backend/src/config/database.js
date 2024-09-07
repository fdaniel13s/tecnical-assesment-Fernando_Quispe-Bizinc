const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * In this part is where we create the connection to the database.
 * A good practice is to store the database credentials in environment variables.
 */
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);

module.exports = sequelize;