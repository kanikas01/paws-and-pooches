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
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: /^\d{5}$/
      }
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
