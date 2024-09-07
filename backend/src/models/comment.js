module.exports = (sequelize, DataTypes) => {
    // Define the Comment model
    const Comment = sequelize.define('Comment', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false, // Content is required
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Default value for published is false
        }
    }, {
        tableName: 'comments' // Ensure the table name is correct with the correct conventions (pluralized)
    });

    // Define associations for the Comment model
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, { foreignKey: 'userId' }); // Comment belongs to a User
        Comment.belongsTo(models.Post, { foreignKey: 'postId' }); // Comment belongs to a Post
    };

    return Comment;
};