

module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define('Tweet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    timestamp: DataTypes.DATE,
  }, {
    createdAt: 'timestamp', // overwrite default ORM timestamps (createdAt / updatedAt) to use 'timestamp' instead
  });
  return Tweet;
};
