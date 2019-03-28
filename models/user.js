module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
      // Possible email validation
    }
  });

  // Associating User with Pets
  // When a User is deleted, also delete any associated Pets
  User.associate = function(models) {
    User.hasMany(models.Pet, {
      onDelete: "cascade"
    });
  };

  return User;
};
