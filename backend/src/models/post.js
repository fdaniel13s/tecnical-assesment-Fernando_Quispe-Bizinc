module.exports = (sequelize, DataTypes) => {
    // Define the Post model
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.TEXT,
            allowNull: false, // Title is required
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true, // Content is optional
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Default value for published is false
        }
    }, {
        tableName: 'posts' // Ensure the table name is correct
    });

    // Define associations for the Post model
    Post.associate = (models) => {
        Post.belongsTo(models.User, { foreignKey: 'userId' }); // Post belongs to a User
        Post.hasMany(models.Comment, { foreignKey: 'postId' }); // Post has many Comments
    };

    return Post;
};