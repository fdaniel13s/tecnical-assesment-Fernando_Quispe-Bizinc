module.exports = (sequelize, DataTypes) => {
    // Define the Task model
    return sequelize.define('Task', {
        title: {
            type: DataTypes.STRING,
            allowNull: false, // Title is required
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true, // Description is optional
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Default value for completed is false
        },
        important: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Default value for important is false
        }
    }, {
        tableName: 'tasks' // Ensure the table name is correct
    });
};