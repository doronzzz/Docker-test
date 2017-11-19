

module.exports = (sequelize, DataTypes) => {
  const ReTweet = sequelize.define('ReTweet', {
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
    },
    {
      createdAt: 'timestamp', // overwrite default ORM timestamps (createdAt / updatedAt) to use 'timestamp' instead
      indexes: [
        {
          unique: true,
          fields: ['post_id', 'username'],
        },
      ],
    });
  ReTweet.associate = (models) => {
    ReTweet.belongsTo(models.Tweet, { foreignKey: 'post_id' });
  };

  return ReTweet;
};
