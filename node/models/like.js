

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
    },
    timestamp: DataTypes.DATE,
  }, {
    createdAt: 'timestamp', // overwrite default ORM timestamps (createdAt / updatedAt) to use 'timestamp' instead
    indexes: [
      {
        unique: true,
        fields: ['post_id', 'username'],
      },
    ],
  });

  Like.associate = (models) => {
    Like.belongsTo(models.Tweet, { foreignKey: 'post_id' });
  };

  return Like;
};
